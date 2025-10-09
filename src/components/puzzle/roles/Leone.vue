<template>
  <div class="wrap">
    <div class="list">
      <div v-for="letter in LETTERS" :key="letter" class="item">
        <div class="thumb" :style="thumbStyle(letter)">
          <div class="overlay"><span class="label">{{ letter }}</span></div>
        </div>
        <div class="meta">
          <div class="piece-title">Pièce <strong>{{ letter }}</strong></div>
          <div class="desc">{{ descriptions[letter] }}</div>
        </div>
      </div>
    </div>

    <!-- Zone validation -->
    <div class="actions">
      <input
        v-model="guess"
        type="text"
        class="code-input"
        placeholder="Entrez le mot secret…"
        @keyup.enter="triggerSuccess"
      />
      <button
        class="validate-button"
        :disabled="!canValidate"
        @click="triggerSuccess"
      >
        Valider
      </button>
    </div>

    <!-- Message de succès -->
    <transition name="fade">
      <div v-if="showSuccess" class="success-banner">
        🎉 Bravo&nbsp;! Mot correct — redirection en cours…
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onUnmounted } from 'vue'
import { IMAGE_URL, SIZE, BOARD_PX, LETTERS, DEFAULT_DESCRIPTIONS } from '@/game/config'
import { gameState } from '@/game/state'
import { useRouter } from 'vue-router'

const descriptions = reactive({ ...DEFAULT_DESCRIPTIONS })

function thumbStyle(letter: string) {
  const idx = gameState.letterToCorrectIndex[letter] ?? 0
  const tilePx = BOARD_PX / SIZE
  const col = idx % SIZE
  const row = Math.floor(idx / SIZE)
  return {
    backgroundImage: `url(${IMAGE_URL})`,
    backgroundSize: `${BOARD_PX}px ${BOARD_PX}px`,
    backgroundPosition: `-${col * tilePx}px -${row * tilePx}px`,
    backgroundRepeat: 'no-repeat',
  }
}

const router = useRouter()
const guess = ref('')

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

const canValidate = computed(() => normalize(guess.value) === 'veritas')

const showSuccess = ref(false)
let timer: number | null = null
const REDIRECT_DELAY = 2000

function triggerSuccess() {
  if (!canValidate.value) return
  if (showSuccess.value) return
  showSuccess.value = true
  timer = window.setTimeout(() => router.push('/leone4'), REDIRECT_DELAY)
}

onUnmounted(() => {
  if (timer) { clearTimeout(timer); timer = null }
})
</script>


<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 900px;
}

/* Carte de chaque pièce */
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  width: 180px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.item:hover { transform: scale(1.05); box-shadow: 0 0 25px rgba(255, 215, 0, 0.4); }

/* Image miniature bien visible */
.thumb {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  background-size: cover;
  background-position: center;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
}
.thumb:hover .overlay { background: rgba(0, 0, 0, 0.05); }
.label {
  color: #ffd700;
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

/* Texte de la pièce */
.meta { margin-top: 0.8rem; }
.piece-title { font-size: 1.2rem; color: #ffd700; font-weight: 700; margin-bottom: 0.3rem; }
.desc { font-size: 0.95rem; color: #e0e0e0; line-height: 1.2rem; }

/* Zone du code + bouton */
.actions {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.code-input {
  width: 280px;
  max-width: 70vw;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: 1.05rem;
  background: rgba(0,0,0,.6);
  color: #fff;
  outline: none;
  border-bottom: 2px solid #ffd700;
}
.code-input:focus { box-shadow: 0 0 10px #ffd700; }

/* Bouton Valider (même style que tes autres pages) */
.validate-button {
  background: linear-gradient(135deg, #ff7043, #fdd835);
  border: none;
  border-radius: 15px;
  padding: 0.8rem 2rem;
  color: #222;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}
.validate-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}
.validate-button:disabled {
  opacity: .6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Message de succès */
.success-banner {
  background: rgba(0, 128, 0, 0.2);
  color: #8aff8a;
  border: 1px solid rgba(0, 255, 0, 0.35);
  padding: .6rem 1rem;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 0 0 12px rgba(0,255,0,.25);
}

/* Transition fade */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
