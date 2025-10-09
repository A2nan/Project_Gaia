<template>
  <div v-if="showBar" class="session-top-bar">
    <button class="leave-button" @click="handleLeave">Quitter le salon</button>

    <div class="right-info">
      <p class="session-display">
        Salon : <strong>{{ currentRoomCodeDisplay }}</strong>
      </p>
      <p class="timer">{{ minutes }}:{{ seconds }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMultiplayer } from '../composables/useMultiplayer'

const { currentRoomCode, leaveRoom } = useMultiplayer()
const router = useRouter()

const totalTime = 8 * 60
const timeLeft = ref(totalTime)
let interval: number | undefined

const minutes = computed(() =>
  Math.floor(timeLeft.value / 60)
    .toString()
    .padStart(2, '0'),
)
const seconds = computed(() => (timeLeft.value % 60).toString().padStart(2, '0'))

onMounted(() => {
  interval = window.setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--
  }, 1000)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})

const route = useRoute()
const showBar = computed(() => !['/', '/role', '/PageFin'].includes(route.path))
const currentRoomCodeDisplay = computed(() => currentRoomCode.value || '...')

function handleLeave() {
  leaveRoom()
  router.push('/role')
}
</script>

<style scoped>
.session-top-bar {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.leave-button {
  background: linear-gradient(135deg, #ff6b6b, #ff3b3b);
  color: #000000;
  font-family: Cascadia Code;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  padding: 1rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
  font-weight: bold;
  margin-top: -100px;
}

.leave-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
}

.right-info {
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 0.8rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  margin-left: 100px;
}

.session-display {
  color: #ffd700;
  font-weight: bold;
  font-size: 1.2rem;
  font-family: Cascadia Code;
}

.timer {
  font-size: 2.2rem;
  font-weight: bold;
  color: #ebdcd8;
  text-shadow: 0 0 5px rgba(0, 255, 228, 0.7);
}
</style>
