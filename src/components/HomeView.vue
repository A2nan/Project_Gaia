<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background.png'

const router = useRouter()
const showInstructions = ref(false)

function nextStep() {
  showInstructions.value = true
}

function startGame() {
  router.push('/role')
}
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <header class="home-header">
      <h1>Machiavel.exe</h1>
      <h2>Le verrou de Florence</h2>
    </header>

    <div v-if="!showInstructions" class="intro-screen">
      <button class="start-button" @click="nextStep">Commencer l'Aventure</button>
    </div>

    <div v-else class="instructions-screen">
      <section class="instructions">
        <p class="tagline">
          Plongez dans un univers artistique et résolvez les énigmes des chefs-d'œuvre !
        </p>

        <h2>Comment jouer</h2>
        <ul>
          <li>4 étapes captivantes à explorer.</li>
          <li>Chaque étape implique 2 joueurs et un capitaine.</li>
          <li>Les indices sont cachés dans les œuvres et détails artistiques.</li>
          <li>La collaboration et l’observation sont la clé de la victoire !</li>
        </ul>
      </section>

      <div class="start-button-container">
        <button class="start-button" @click="startGame">Suivant</button>
      </div>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
.home-header h1 {
  font-size: 5rem;
  color: #f9f2f0;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  font-family: 'Brush Script MT', cursive;
  margin-top: -10rem;
}
.home-header h2 {
  font-size: 5rem;
  color: #f9f2f0;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  font-family: 'Brush Script MT', cursive;
  margin-top: -3rem;
}
/* Carte instructions */
.instructions {
  background-color: rgba(0, 0, 0, 0.5); /* noir semi-transparent */
  border: 3px solid #ffd700;
  border-radius: 20px;
  padding: 2rem;
  max-width: 650px;
  color: #fff;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.8s ease forwards;
}

/* Phrase artistique dans la carte */
.tagline {
  font-size: 1.4rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  font-family: cursive;
}

/* Liste instructions */
.instructions ul {
  list-style: inside disc;
  line-height: 1.8;
  text-align: left;
}

/* Boutons */
.start-button-container,
.intro-screen {
  text-align: center;
  margin-top: 1.5rem;
}

.start-button {
  background: linear-gradient(135deg, #ff6f61, #f9d342, #6b4f4f);
  color: #fff;
  font-weight: bold;
  font-size: 1.6rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 0 25px rgba(255, 111, 97, 0.7);
  font-family: 'Cursive', sans-serif;
}

.start-button:hover {
  transform: rotate(-2deg) scale(1.08);
  box-shadow: 0 0 40px rgba(255, 111, 97, 0.9);
}

.instructions-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
