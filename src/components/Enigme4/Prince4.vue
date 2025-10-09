<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/BackgroundJeux.png'

const router = useRouter()
const password = ref('')
const result = ref<boolean | null>(null)
const correctPassword = 'MONALIZA'

// Chaque couronne contient un mot et une lettre en vert
const crowns = ref([
  { id: 1, word: 'Musée', greenLetter: 'M', revealed: false, top: '0%', left: '0%' },
  { id: 2, word: 'Ovale', greenLetter: 'O', revealed: false, top: '0%', left: '0%' },
  { id: 3, word: 'Nuit', greenLetter: 'N', revealed: false, top: '0%', left: '0%' },
  { id: 4, word: 'Art', greenLetter: 'A', revealed: false, top: '0%', left: '0%' },
  { id: 5, word: 'Louvre', greenLetter: 'L', revealed: false, top: '0%', left: '0%' },
  { id: 6, word: 'Italie', greenLetter: 'I', revealed: false, top: '0%', left: '0%' },
  { id: 7, word: 'Zèbre', greenLetter: 'Z', revealed: false, top: '0%', left: '0%' },
  { id: 8, word: 'Aquarelle', greenLetter: 'A', revealed: false, top: '0%', left: '0%' },
])

// Générer des positions aléatoires pour chaque couronne au montage
onMounted(() => {
  crowns.value.forEach((c) => {
    c.top = `${Math.random() * 70 + 5}%` // entre 5% et 75%
    c.left = `${Math.random() * 80 + 5}%` // entre 5% et 85%
  })
})

function revealCrown(id: number) {
  const crown = crowns.value.find((c) => c.id === id)
  if (crown) crown.revealed = true
}

function checkPassword() {
  if (password.value.toUpperCase() === correctPassword) {
    result.value = true
    setTimeout(() => router.push('/PageFin'), 2000)
  } else {
    result.value = false
  }
}

const allRevealed = () => crowns.value.every((c) => c.revealed)
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="prince-panel">
      <header class="header">
        <h1 class="title">🤴 Château du Prince</h1>
        <p class="subtitle">
          Clique sur les couronnes pour découvrir les lettres du mot de passe !
        </p>
      </header>

      <div class="crowns-container">
        <div
          v-for="crown in crowns"
          :key="crown.id"
          class="crown"
          :style="{ top: crown.top, left: crown.left }"
          @click="revealCrown(crown.id)"
        >
          👑
          <span v-if="crown.revealed" class="word">
            <span
              v-for="(char, index) in crown.word.split('')"
              :key="index"
              :class="{ green: char.toUpperCase() === crown.greenLetter }"
            >
              {{ char }}
            </span>
          </span>
        </div>
      </div>

      <section class="input-section" v-if="allRevealed()">
        <p>Tu as trouvé toutes les lettres vertes ! Assemble-les pour trouver le mot de passe :</p>
        <input
          type="text"
          v-model="password"
          placeholder="Entrez le mot de passe"
          class="guess-input"
        />
        <button class="validate-button" @click="checkPassword">Valider</button>
      </section>

      <transition name="fade">
        <div
          v-if="result !== null"
          class="result-message"
          :class="{ success: result, fail: !result }"
        >
          <p v-if="result">🎉 Bravo ! Le mot de passe est correct !</p>
          <p v-else>❌ Mot de passe incorrect, continuez à chercher !</p>
        </div>
      </transition>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
.prince-panel {
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 2rem 3rem;
  max-width: 900px;
  width: 80%;
  margin: auto;
  text-align: center;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
  color: #fff;
  font-family: 'Orbitron', sans-serif;
}

.header .title {
  font-size: 2.5rem;
  color: #ffd700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.9);
  margin-bottom: 0.5rem;
}

.header .subtitle {
  font-size: 1.2rem;
  color: #fff8dc;
  font-style: italic;
  margin-bottom: 2rem;
}

.crowns-container {
  position: relative;
  width: 100%;
  height: 600px;
}

.crown {
  position: absolute;
  font-size: 4rem;
  cursor: pointer;
  user-select: none;
  transition:
    transform 0.3s,
    filter 0.3s;
}

.crown:hover {
  transform: scale(1.4);
  filter: drop-shadow(0 0 15px #ffd700);
}

.word {
  display: block;
  margin-top: 0.3rem;
  font-size: 1.2rem;
}

.word .green {
  color: #8aff8a;
  font-weight: bold;
}

.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.guess-input {
  width: 60%;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: 1.3rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  outline: none;
  border-bottom: 2px solid #ffd700;
}

.guess-input:focus {
  box-shadow: 0 0 15px #ffd700;
}

.validate-button {
  background: linear-gradient(135deg, #ff7043, #fdd835);
  border: none;
  border-radius: 15px;
  padding: 0.8rem 2rem;
  color: #222;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

.validate-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}

.result-message {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 15px;
}

.result-message.success {
  background: rgba(0, 255, 0, 0.2);
  color: #8aff8a;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
}

.result-message.fail {
  background: rgba(255, 0, 0, 0.2);
  color: #ff8a8a;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.4);
}
</style>
