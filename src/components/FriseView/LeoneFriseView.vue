<script setup lang="ts">
import { ref } from 'vue'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background1.jpg'
import { useRouter } from 'vue-router' // ⬅️ ajouté

const router = useRouter()

// État des lumières et du texte
const lights = ref(['off', 'off', 'off', 'off', 'off', 'off'])
const analysing = ref(false)
const result = ref('')
const machiavelliText = ref('')

// Simulation de l'analyse
async function startAnalysis() {
  if (analysing.value) return
  analysing.value = true
  result.value = ''
  machiavelliText.value = ''
  lights.value = ['off', 'off', 'off', 'off', 'off', 'off']

  // Animation d’allumage progressif
  for (let i = 0; i < lights.value.length; i++) {
    await new Promise((res) => setTimeout(res, 500))
    lights.value[i] = 'on'
  }

  analysing.value = false

  // 🧩 Lecture du résultat stocké par le Prince
  const outcome = localStorage.getItem('resultat_frise')

  console.log(outcome)
  if (outcome === null) {
    result.value = '✨ L’harmonie temporelle est parfaite. Mot secret : VIRTUS.'
    machiavelliText.value = '“Même le Lion comprend que la force seule ne suffit pas…”'
    setTimeout(() => router.push('/playerVue'), 5000)
  }
}
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <header class="game-header">
      <h1>🦁 Il Leone</h1>
      <h2>Machiavel.exe — Salle d’Analyse</h2>
    </header>

    <main class="panel">
      <section class="timeline">
        <h3>Analyse des flux temporels</h3>

        <div class="lights">
          <div v-for="(state, i) in lights" :key="i" class="light">
            <div class="dot" :class="state"></div>
            <span class="idx">{{ i + 1 }}</span>
          </div>
        </div>

        <button class="analyze-btn" @click="startAnalysis" :disabled="analysing">
          {{ analysing ? 'Analyse en cours...' : 'Analyser la frise' }}
        </button>

        <p class="result">{{ result }}</p>

        <div v-if="machiavelliText" class="machiavelli-box">
          <p>{{ machiavelliText }}</p>
        </div>
      </section>
    </main>
  </FullScreenWrapper>
</template>

<style scoped>
/* HEADER */
.game-header {
  text-align: center;
  margin-top: 0.5rem;
}
.game-header h1 {
  font-size: 3rem;
  color: #ffd700;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
  margin: 0;
  font-family: 'Poppins', sans-serif;
}
.game-header h2 {
  font-family: 'Cascadia Code', monospace;
  font-size: 1.4rem;
  color: #c94e2e;
  margin: 0.2rem 0 1rem;
}

/* PANEL */
.panel {
  height: 72vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* TIMELINE */
.timeline {
  background: rgba(0, 0, 0, 0.55);
  border: 2px solid #ffd700;
  border-radius: 14px;
  padding: 1.4rem 1.2rem;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.25);
  text-align: center;
  width: 80%;
  max-width: 900px;
}
.timeline h3 {
  color: #ffd700;
  margin: 0 0 0.8rem;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
}
.lights {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin: 0.8rem 0 1.2rem;
}
.light {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffd700;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4);
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease;
}
.dot.on {
  background: #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.9);
}
.idx {
  color: #ffd700;
  font-weight: 700;
}
.analyze-btn {
  background: #ffd700;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Cascadia Code', monospace;
  transition: transform 0.2s ease;
}
.analyze-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}
.analyze-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* RESULT */
.result {
  color: #fff;
  margin-top: 1rem;
  font-weight: 600;
  font-family: 'Cascadia Code', monospace;
}

/* MACHAVELLI BOX */
.machiavelli-box {
  margin-top: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1.5px solid #ffd700;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}
.machiavelli-box p {
  color: #ffd700;
  font-style: italic;
  margin: 0;
  font-size: 1rem;
}

/* RESPONSIVE */
@media (max-width: 1280px) {
  .dot {
    width: 42px;
    height: 42px;
  }
  .timeline {
    width: 95%;
    padding: 1rem;
  }
}
</style>
