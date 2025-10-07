<template>
  <main class="captain-container">
    <div class="captain-panel">
      <header class="header">
        <h1 class="title">🧭 Poste du Capitaine</h1>
        <p class="subtitle">Analyse les indices et découvre le mot secret...</p>
      </header>

      <section class="hints-section">
        <div class="hint-card">
          <h3>Indice Joueur 1</h3>
          <p>{{ player1Hint }}</p>
        </div>
        <div class="hint-card">
          <h3>Indice Joueur 2</h3>
          <p>{{ player2Hint }}</p>
        </div>
      </section>

      <section class="input-section">
        <input
          type="text"
          v-model="guess"
          placeholder="Entre ton mot final..."
          class="guess-input"
        />
        <button class="validate-button" @click="checkGuess">Valider</button>
      </section>

      <transition name="fade">
        <div
          v-if="result !== null"
          class="result-message"
          :class="{ success: result, fail: !result }"
        >
          <p v-if="result">🎉 Bravo Capitaine ! Le mot secret est correct.</p>
          <p v-else>❌ Faux ! L’énigme résiste encore...</p>
        </div>
      </transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const player1Hint = ' La première lettre est A'
const player2Hint = ' La dernière lettre est E'

const guess = ref('')
const result = ref<boolean | null>(null)
const finalWord = 'APPLE'

function checkGuess() {
  result.value = guess.value.toUpperCase() === finalWord
}
</script>

<style scoped>
/* Arrière-plan immersif */
.captain-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #00111f, #000);
  background-image: url('@/components/images/Background3.jpg');
  background-size: cover;
  background-position: center;
  text-align: center;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

.captain-panel {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 25px;
  padding: 3rem 4rem;
  max-width: 700px;
  width: 60%;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
  animation: fadeIn 1s ease forwards;
}

/* Titre et sous-titre */
.header .title {
  font-size: 2.8rem;
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

/* Indices */
.hints-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.hint-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 1rem 1.5rem;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
}

.hint-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.hint-card h3 {
  color: #ffd700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.hint-card p {
  font-size: 1.1rem;
  color: #e0e0e0;
}

/* Entrée du mot final */
.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.guess-input {
  width: 80%;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: 1.3rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  border-bottom: 2px solid #ffd700;
}

.guess-input:focus {
  box-shadow: 0 0 15px #ffd700;
}

/* Bouton Valider */
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

/* Résultat */
.result-message {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 15px;
  animation: fadeIn 0.5s ease;
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

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
