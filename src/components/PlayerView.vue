<script setup lang="ts">
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background.png'
import Volpe from '@/components/puzzle/roles/Volpe.vue'
import Leone from '@/components/puzzle/roles/Leone.vue'

// Props
const props = defineProps<{ player: number }>()

</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="player-panel">
      <header class="header">
        <h1 v-if="props.player === 1" class="title">🐺 Volpe</h1>
        <h1 v-if="props.player === 2" class="title">🦁 Leone</h1>
        <p v-if="props.player === 1" class="subtitle">
          Décris chaque case (1→9) au Capitaine : couleurs, formes, mains, ciel, personnages…
        </p>

        <p v-if="props.player === 2" class="subtitle">
          Indique au Capitaine quelle lettre correspond à ce que Volpe décrit pour une case donnée.
        </p>
      </header>

      <section class="hint-section">
        <Volpe v-if="props.player === 1" />
        <Leone v-else />
      </section>

      <section class="info-section">
        <p>💡 Partage ton indice avec le capitaine pour qu’il puisse trouver le mot final.</p>
      </section>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
/* Fond et container */
.player-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #00111f, #000);
  background-image: url('@/components/images/Background3.jpg');
  background-size: cover;
  background-position: center;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  text-align: center;
}

.player-panel {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 25px;
  padding: 3rem 4rem;
  max-width: 900px;
  width: 80%;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
  animation: fadeIn 1s ease forwards;
}

/* Header */
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

/* Carte indice / rôle */
.hint-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Section info */
.info-section p {
  font-size: 1rem;
  color: #ffe4b5;
}

/* Animations */
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
