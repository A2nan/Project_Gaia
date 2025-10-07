<template>
  <main class="player-container">
    <div class="player-panel">
      <header class="header">
        <h1 class="title">Joueur {{ props.player }}</h1>
        <p class="subtitle">Analyse ton indice et aide le capitaine à deviner le mot secret !</p>
      </header>

      <section class="hint-section">
        <div class="hint-card">
          <h3>Ton indice</h3>
          <p>{{ hint }}</p>
        </div>
      </section>

      <section class="info-section">
        <p>💡 Partage ton indice avec le capitaine pour qu’il puisse trouver le mot final.</p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps<{ player: number }>()

// Hints pour chaque joueur
const hints: Record<number, string> = {
  1: 'La première lettre est A',
  2: 'La dernière lettre est E',
}

// Hint calculé pour ce joueur
const hint = computed(() => hints[props.player] ?? 'Indice non disponible')
</script>

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
  max-width: 600px;
  width: 60%;
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

/* Carte indice */
.hint-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
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
