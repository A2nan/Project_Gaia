<script setup lang="ts">
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background3.jpg'
import { useRouter } from 'vue-router'
import { computed, ref, onUnmounted } from 'vue'

const router = useRouter()
const guess = ref('')

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

const canValidate = computed(() => normalize(guess.value) === 'virtus')

const showSuccess = ref(false)
let timer: number | null = null
const REDIRECT_DELAY = 2000

function goNext() {
  if (!canValidate.value) return
  if (showSuccess.value) return
  showSuccess.value = true
  timer = window.setTimeout(() => router.push('/PageFin'), REDIRECT_DELAY)
}

type HintGroup = {
  id: string
  title: string
  tips: string[]
}

const hintGroups: HintGroup[] = [
  { id: 'g1', title: 'Tableau #1', tips: ['L’Ange et la Vierge','L’Annonciation','La Visite Céleste','La Parole Divine','La Confession'] },
  { id: 'g2', title: 'Tableau #2', tips: ['Les Derniers Rayons','Le Voyageur et la Mère','Sous l’Orage','La Tempête','L’Attente'] },
  { id: 'g3', title: 'Tableau #3', tips: ['La Danse des Fleurs','La Célébration de Vénus','Allégorie du Printemps','La Forêt des Saisons','Le Jardin des Dieux'] },
]

onUnmounted(() => { if (timer) clearTimeout(timer) })
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="dark-frame">
      <div class="captain-view">
        <h1 class="room-title">🎭 Joueur — Indices des Titres</h1>

        <p class="description">
          Aide le capitaine en lui proposant des <strong>titres possibles</strong> pour chaque
          œuvre. Certains sont <em>justes</em>, d’autres sont des <em>leurres</em> 👀
        </p>

        <div class="hints-grid">
          <section v-for="group in hintGroups" :key="group.id" class="hint-card">
            <h2 class="hint-title">{{ group.title }}</h2>
            <div class="chips">
              <span v-for="(t, i) in group.tips" :key="i" class="chip">{{ t }}</span>
            </div>
          </section>
        </div>
      </div>

      <!-- Zone validation -->
      <div class="actions">
        <input
          v-model="guess"
          type="text"
          class="code-input"
          placeholder="Entrez le mot secret…"
        />
        <button class="validate-button" :disabled="!canValidate" @click="goNext">
          Valider
        </button>
      </div>

      <transition name="fade">
        <div v-if="showSuccess" class="success-banner">
          🎉 Bravo ! Mot correct — redirection en cours…
        </div>
      </transition>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
.dark-frame {
  background: rgba(0, 0, 0, 0.82);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 20px;
  padding: 18px 22px;
  max-width: 1040px;
  width: min(92vw, 1040px);
  margin: 24px auto;
  box-shadow: 0 0 24px rgba(0,0,0,.6), 0 0 28px rgba(255,215,0,.12) inset;
}

.captain-view { text-align: center; color: #fff; margin: 0 auto; }

.room-title {
  font-family: 'Brush Script MT', cursive;
  font-size: 2.6rem;
  color: #ffd700;
  margin-bottom: .6rem;
  text-shadow: 2px 2px 10px rgba(0,0,0,.7);
}
.description {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,215,0,.35);
  border-radius: 12px;
  padding: .7rem .9rem;
}

.hints-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 16px;
}
@media (max-width: 920px){ .hints-grid { grid-template-columns: repeat(2, minmax(220px, 1fr)); } }
@media (max-width: 600px){ .hints-grid { grid-template-columns: 1fr; } }

.hint-card {
  background: rgba(0,0,0,.55);
  border: 1px solid rgba(255,215,0,.35);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 0 18px rgba(255,215,0,.18);
  text-align: left;
}
.hint-title { margin: 0 0 .5rem; font-size: 1.15rem; color: #ffd700; font-weight: 800; }

.chips { display: flex; flex-wrap: wrap; gap: .5rem; }
.chip {
  display: inline-flex; align-items: center;
  padding: .45rem .7rem; border-radius: 999px;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,215,0,.25);
  color: #eaeaea; font-weight: 600; font-size: .96rem; letter-spacing: .01rem;
  backdrop-filter: blur(2px); white-space: nowrap;
}

/* Validation */
.actions {
  display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap; margin-top: 12px;
}
.code-input {
  width: 280px; max-width: 70vw; padding: 0.6rem 0.9rem;
  border-radius: 10px; border: none; text-align: center; font-size: 1.05rem;
  background: rgba(0,0,0,.6); color: #fff; outline: none; border-bottom: 2px solid #ffd700;
}
.code-input:focus { box-shadow: 0 0 10px #ffd700; }

.validate-button {
  background: linear-gradient(135deg, #ff7043, #fdd835);
  border: none; border-radius: 15px; padding: 0.8rem 2rem;
  color: #222; font-size: 1.1rem; font-weight: 800; cursor: pointer; transition: .3s ease;
  box-shadow: 0 0 15px rgba(255,215,0,.3);
}
.validate-button:hover { transform: scale(1.05); box-shadow: 0 0 25px rgba(255,215,0,.6); }
.validate-button:disabled { opacity: .6; cursor: not-allowed; transform: none; box-shadow: none; }

/* Succès */
.success-banner {
  margin-top: 10px;
  background: rgba(0, 128, 0, 0.2);
  color: #8aff8a;
  border: 1px solid rgba(0, 255, 0, 0.35);
  padding: .6rem 1rem;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 0 0 12px rgba(0,255,0,.25);
}

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
