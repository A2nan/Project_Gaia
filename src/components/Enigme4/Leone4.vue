<script setup lang="ts">
import { ref } from 'vue'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/BackgroundJeux.png'

const revealed = ref(false)
function revealHint() {
  revealed.value = true
}
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="character-panel">
      <header class="header">
        <h1 class="title">🦁 Leone</h1>
        <p class="subtitle">Clique pour révéler ton indice !</p>
      </header>

      <button class="hint-button" @click="revealHint">Afficher l'indice</button>

      <p v-if="revealed" class="hint-text">
        Seules les lettres en <span class="green-word">vert</span> sur les papiers révèlent le mot
        correct.
      </p>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
.character-panel {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 25px;
  padding: 3rem 4rem;
  max-width: 700px;
  width: 60%;
  margin: 3rem auto;
  text-align: center;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
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

.hint-button {
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  border: none;
  background: linear-gradient(135deg, #ff7043, #fdd835);
  cursor: pointer;
  font-weight: bold;
  color: #222;
  font-size: 1.1rem;
  transition: 0.3s ease;
}

.hint-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}

.hint-text {
  margin-top: 1.5rem;
  color: #ffffff; /* texte principal blanc */
  font-size: 1.3rem;
  font-weight: bold;
}

.green-word {
  color: #90ee90; /* mot "vert" en vert */
}
</style>
