<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import backgroundImage from '@/components/images/Background2.jpg'

const router = useRouter()
const activeRole = ref<string | null>(null) // rôle actuellement ouvert

// Rôles avec leurs infos
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

function toggleRole(roleId: string) {
  activeRole.value = activeRole.value === roleId ? null : roleId
}

function selectRole(route: string) {
  router.push(route)
}
</script>

<template>
  <main
    class="selection-container"
    :style="{
      background: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="selection-card">
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
  </main>
</template>

<style scoped>
.selection-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff;
  text-align: center;
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
  font-family: 'Brush Script MT', cursive;
  font-size: 3rem;
  color: #ffd700;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.8);
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.3rem;
  font-style: italic;
  color: #fff8dc;
  margin-bottom: 3rem;
}

.role-selection {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.role-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.role-button {
  font-family: 'Brush Script MT', cursive;
  background: linear-gradient(135deg, #ff7043, #fdd835);
  color: #222;
  font-weight: bold;
  font-size: 2rem;
  padding: 1rem 3rem;
  border: 3px solid transparent;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  width: 100%;
}

.role-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.8);
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
  font-family: 'Brush Script MT', cursive;
  font-size: 1.4rem;
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

/* ANIMATION APPARITION */
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
