<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background6.png'
import LeaveRoomButton from '@/components/LeaveRoomButton.vue'

const router = useRouter()
const activeRole = ref<string | null>(null)
const sessionNumber = ref<string>('') // code de salon entré ou généré
const joined = ref(false)

const currentRoomCode = ref<string | null>(null)
const playerCount = ref<number>(0)

let socket: WebSocket | null = null

const roles = [
  {
    id: 'captain',
    name: 'Capitaine',
    emoji: '👑',
    description:
      'Devenir le meneur du groupe et rassembler les indices pour résoudre le mot final.',
    route: '/captain',
  },
  {
    id: 'player1',
    name: 'Volpe',
    emoji: '🦊',
    description: "L'esprit rusé qui détient un indice précieux pour le capitaine.",
    route: '/player/1',
  },
  {
    id: 'player2',
    name: 'Leone',
    emoji: '🦁',
    description: 'La force tranquille du groupe, gardien d’un autre indice essentiel.',
    route: '/player/2',
  },
]

// --- Log dans la console ---
function logMessage(msg: string) {
  console.log(`[WebSocket] ${msg}`)
}

// --- Connexion WebSocket ---
function connect() {
  socket = new WebSocket('ws://10.0.3.241:8080')
  socket.onopen = () => logMessage('Connecté au serveur WebSocket')
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case 'roomCreated':
        currentRoomCode.value = data.roomCode
        sessionNumber.value = data.roomCode
        playerCount.value = data.playerCount
        joined.value = true
        logMessage(`Salon créé : ${data.roomCode}`)
        break
      case 'roomJoined':
        currentRoomCode.value = data.roomCode
        playerCount.value = data.playerCount
        joined.value = true
        logMessage(`Rejoint le salon : ${data.roomCode}`)
        break
      case 'roomLeft':
        currentRoomCode.value = null
        playerCount.value = 0
        joined.value = false
        logMessage(data.message)
        break
      case 'info':
        logMessage(data.message)
        if (data.playerCount !== undefined) playerCount.value = data.playerCount
        break
      case 'error':
        logMessage(`Erreur : ${data.message}`)
        break
    }
  }
  socket.onerror = (error) => logMessage(`Erreur WebSocket : ${(error as any).message}`)
  socket.onclose = () => logMessage('Déconnecté du serveur')
}

// --- Créer une session ---
function createSession() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    connect()
    setTimeout(() => {
      socket?.send(JSON.stringify({ type: 'createRoom' }))
      logMessage('Création d’un nouveau salon...')
    }, 300)
  } else {
    socket.send(JSON.stringify({ type: 'createRoom' }))
    logMessage('Création d’un nouveau salon...')
  }
}

// --- Rejoindre une session ---
function joinSession() {
  const code = sessionNumber.value.trim()
  if (code === '') {
    alert('Veuillez saisir un numéro de session valide.')
    return
  }

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    connect()
    setTimeout(() => {
      socket?.send(JSON.stringify({ type: 'joinRoom', roomCode: code }))
      logMessage(`Tentative de rejoindre le salon ${code}...`)
    }, 300)
  } else {
    socket.send(JSON.stringify({ type: 'joinRoom', roomCode: code }))
    logMessage(`Tentative de rejoindre le salon ${code}...`)
  }
}

// --- Sélection des rôles ---
function toggleRole(roleId: string) {
  activeRole.value = activeRole.value === roleId ? null : roleId
}

function selectRole(route: string) {
  router.push(route)
}

onBeforeUnmount(() => {
  if (socket) socket.close()
})
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <!-- Bouton Quitter visible seulement après avoir rejoint/créé une session -->
    <LeaveRoomButton
      v-if="joined"
      class="leave-button-fixed"
      :socket="socket"
      :joined="joined"
      :sessionNumber="sessionNumber"
    />

    <div class="selection-card">
      <!-- Page d’accueil : Rejoindre ou Créer -->
      <div v-if="!joined" class="session-join">
        <h2 class="session-title">Entrez un numéro de session pour rejoindre</h2>
        <input
          v-model="sessionNumber"
          type="text"
          placeholder="Numéro de session"
          class="session-input"
        />
        <div class="button-group">
          <button class="join-button" @click="joinSession">Rejoindre</button>
          <button class="create-button" @click="createSession">Créer</button>
        </div>
      </div>

      <!-- Après connexion au salon -->
      <div v-else>
        <div class="session-display">
          <p>
            Salon : <strong>{{ currentRoomCode || sessionNumber }}</strong>
          </p>
          <p>
            Joueurs connectés : <strong>{{ playerCount }}/3</strong>
          </p>
        </div>

        <header class="selection-header">
          <h1>🎭 Choisissez votre rôle</h1>
          <p class="tagline">Chaque artiste a un rôle unique à jouer...</p>
        </header>

        <section class="role-selection">
          <div v-for="role in roles" :key="role.id" class="role-wrapper">
            <button class="role-button" @click="toggleRole(role.id)">
              {{ role.emoji }} {{ role.name }}
            </button>

            <transition name="fade">
              <div v-if="activeRole === role.id" class="role-info-card">
                <p class="role-description">{{ role.description }}</p>
                <button class="choose-button" @click="selectRole(role.route)">Choisir</button>
              </div>
            </transition>
          </div>
        </section>
      </div>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
.leave-button-fixed {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #ffd700 !important;
  color: #222 !important;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: transform 0.2s ease;
}

.leave-button-fixed:hover {
  transform: scale(1.05);
}
.selection-card {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 3rem 4rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.7);
  max-width: 400px;
  width: 90%;
}

.selection-header h1 {
  font-family: Cascadia Code;
  font-size: 1.7rem;
  color: #ffd700;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.3rem;
  font-style: italic;
  color: #fff8dc;
  margin-bottom: 2rem;
}

.session-join {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.session-title {
  font-size: 1.5rem;
  color: #ffd700;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
  font-family: Cascadia Code;
}

.session-input {
  padding: 0.8rem 1rem;
  border-radius: 15px;
  border: none;
  width: 80%;
  font-size: 1.2rem;
}

.join-button {
  background: linear-gradient(135deg, #ff7043, #fdd835);
  color: #222;
  font-family: Cascadia Code;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.join-button:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
}

.create-button {
  background: linear-gradient(135deg, #66bb6a, #cddc39);
  color: #222;
  font-family: Cascadia Code;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.create-button:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
}

.session-display {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: #ffd700;
}

.role-selection {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.role-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-button {
  font-family: Cascadia Code;
  background: linear-gradient(135deg, #ff7043, #fdd835);
  color: #222;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem 3rem;
  border: 3px solid transparent;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  width: 100%;
}

.role-info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  padding: 1.5rem;
  margin-top: 1rem;
  width: 100%;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
}

.role-description {
  font-size: 1.2rem;
  font-style: italic;
  color: #fffbea;
  margin-bottom: 1rem;
}

.choose-button {
  background: linear-gradient(135deg, #ff7043, #fdd835);
  color: #222;
  font-family: Cascadia Code;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.choose-button:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
