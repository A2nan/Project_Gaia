<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/background4.jpg'

const router = useRouter()

function goHome() {
  router.push('/') // redirection vers la page d'accueil
}

// Pour les animations d'apparition
const showLessons = ref(false)
const showTeamwork = ref(false)
const showButton = ref(false)

onMounted(() => {
  setTimeout(() => (showLessons.value = true), 500)
  setTimeout(() => (showTeamwork.value = true), 1200)
  setTimeout(() => (showButton.value = true), 2000)
})
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="overlay">
      <div class="content">
        <h1>✨ Félicitations ! ✨</h1>
        <p class="message">Vous avez terminé l’escape game avec succès !</p>

        <transition name="fade-slide">
          <div v-if="showLessons" class="lesson-card">
            <h2>✨ Leçons retenues</h2>
            <ul>
              <li>Observer attentivement chaque indice pour avancer.</li>
              <li>Communiquer clairement avec vos coéquipiers.</li>
              <li>Prendre des décisions stratégiques ensemble.</li>
            </ul>
          </div>
        </transition>

        <transition name="fade-slide" mode="out-in">
          <div v-if="showTeamwork" class="team-card">
            <h2>🤝 Travail en équipe</h2>
            <p>
              Chaque membre a contribué à la réussite. La collaboration, l’écoute et le partage
              d’idées sont essentiels pour résoudre les défis ensemble.
            </p>
          </div>
        </transition>

        <transition name="fade-slide">
          <button v-if="showButton" class="home-button" @click="goHome">Retour à l'accueil</button>
        </transition>
      </div>

      <div class="confetti-container"></div>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
.overlay {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(5px);
}

.content {
  text-align: center;
  color: #f3e5ab;
  padding: 3rem 4rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Cascadia Code', monospace;
  text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.7);
}

.message {
  font-size: 1.5rem;
  font-family: 'Cascadia Code', monospace;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
}

.lesson-card,
.team-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  padding: 1.5rem 2rem;
  border-radius: 15px;
  max-width: 500px;
  text-align: left;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
}

.lesson-card h2,
.team-card h2 {
  margin-bottom: 0.8rem;
  font-size: 1.5rem;
  color: #ffd700;
}

.lesson-card ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  font-size: 1.2rem;
}

.team-card p {
  font-size: 1.2rem;
  line-height: 1.5;
}

.home-button {
  background: linear-gradient(135deg, #e98367, #cb6008);
  color: #fff;
  font-family: 'Cascadia Code', monospace;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 200, 100, 0.4);
}

.home-button:hover {
  transform: scale(1.08);
  box-shadow: 0 0 35px rgba(255, 200, 100, 0.6);
}

/* Confettis */
.confetti-container {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f3e5ab;
  top: -10px;
  left: calc(var(--x, 50%) * 1%);
  opacity: 0.8;
  animation: fall linear infinite;
  animation-duration: calc(2s + var(--i) * 0.1s);
  border-radius: 50%;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}

/* Animations de fade + slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
