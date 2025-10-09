<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/BackgroundJeux.png'

const revealed = ref(false)
const router = useRouter()

function revealHint() {
  revealed.value = true
}

function goNext() {
  router.push('/FriseChronovulpe') // change le chemin selon ta prochaine page
}
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="character-panel">
      <header class="header">
        <h1 class="title">🦊 Volpe</h1>
        <p class="subtitle">Clique pour révéler ton indice !</p>
      </header>

      <button class="hint-button" @click="revealHint">Afficher l'indice</button>
      <p v-if="revealed" class="hint-text">Le mot de passe contient 6 lettres.</p>

      <button v-if="revealed" class="next-button" @click="goNext">Suivante</button>
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
  color: #add8e6; /* bleu pour Volpe */
  font-size: 1.3rem;
  font-weight: bold;
}

.next-button {
  margin-top: 2rem;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  border: none;
  background: linear-gradient(135deg, #ffd700);
  cursor: pointer;
  font-weight: bold;
  color: #222;
  font-size: 1.1rem;
  transition: 0.3s ease;
}

.next-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}
</style>
