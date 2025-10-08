<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background3.jpg'

const router = useRouter()

// Devise correcte
const motto = 'ANCORA IMPARO'
const input = ref('')
const message = ref('')
const success = ref(false)

// Vérifier la saisie du Capitaine
function validate() {
  if (input.value.toUpperCase().trim() === motto) {
    success.value = true
    message.value = '🎉 Bravo ! La devise est correcte !'

    // redirection après 2,5s
    setTimeout(() => {
      router.push('/nextview') // Remplace par la page suivante
    }, 2500)
  } else {
    success.value = false
    message.value = '❌ Mauvaise réponse, réessaie !'
    input.value = ''
  }
}
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="captain-view">
      <h1 class="room-title">🏛️ Salle 3 — “Motto”</h1>

      <p class="description">
        Objectif : retrouvez la devise de Michel-Ange et tapez-la ci-dessous.
      </p>

      <div class="input-section">
        <input type="text" v-model="input" placeholder="Entrez la devise" class="motto-input" />
        <button class="validate-button" @click="validate">Valider</button>
      </div>

      <div v-if="message" class="result-message" :class="{ success: success }">
        {{ message }}
      </div>

      <div v-if="success" class="code-display">🔓 Code obtenu : <strong>IMPARO</strong></div>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
.captain-view {
  text-align: center;
  color: #fff;
  max-width: 700px;
  margin: auto;
}

.room-title {
  font-family: 'Brush Script MT', cursive;
  font-size: 3rem;
  color: #ffd700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
}

.description {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #ffd700;
  border-radius: 15px;
  padding: 1rem;
}

.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.motto-input {
  width: 80%;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: 1.3rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  outline: none;
  border-bottom: 2px solid #ffd700;
}

.motto-input:focus {
  box-shadow: 0 0 15px #ffd700;
}

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

.result-message {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 15px;
}

.result-message.success {
  background: rgba(0, 255, 0, 0.2);
  color: #8aff8a;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
}

.code-display {
  margin-top: 1.5rem;
  font-size: 1.8rem;
  color: #ffd700;
  font-weight: bold;
}
</style>
