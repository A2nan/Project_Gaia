<template>
  <div class="wrap">
    <div class="model">
      <img :src="IMAGE_URL" alt="La Création d’Adam" />
      <div class="grid">
        <div v-for="i in 9" :key="i" class="cell">{{ i }}</div>
      </div>
    </div>

    <!-- Zone validation -->
    <div class="actions">
      <input
        v-model="guess"
        type="text"
        class="code-input"
        placeholder="Entre le mot final..."
        @keyup.enter="checkGuess"
      />
      <button class="validate-button" @click="checkGuess">Valider</button>
    </div>

    <!-- Message résultat -->
    <transition name="fade">
      <div
        v-if="result !== null"
        class="result-message"
        :class="{ success: result, fail: !result }"
      >
        <p v-if="result">🎉 Bravo ! Le mot est correct.</p>
        <p v-else>❌ Faux ! Réessaie…</p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IMAGE_URL } from '@/game/config'

const router = useRouter()

const guess = ref('')
const result = ref<boolean | null>(null)
const finalWord = 'VERITAS'

function checkGuess() {
  if (guess.value.toUpperCase().trim() === finalWord) {
    result.value = true
    // Redirection après 2 secondes (même logique que la page Capitaine)
    setTimeout(() => {
      router.push('/playervue')
    }, 2000)
  } else {
    result.value = false
  }
}
</script>

<style scoped>
.wrap {
  display: grid;
  gap: 14px;
  justify-items: center;
}

.model {
  position: relative;
  width: 600px;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #ddd inset;
}

.model img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: #fff;
  font-weight: 800;
  font-size: 20px;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.14);
  border: 1px dashed rgba(255,255,255,.35);
  text-shadow: 0 1px 2px rgba(0,0,0,.6);
}

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

/* Bouton Valider (même style que l'autre composant) */
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

/* Message résultat (succès/échec) */
.result-message {
  margin-top: 0.75rem;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 1rem;
  border-radius: 12px;
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

/* Transition fade */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
