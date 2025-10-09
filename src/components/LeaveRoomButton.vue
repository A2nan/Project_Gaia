<script setup lang="ts">
import { useMultiplayer } from '@/composables/useMultiplayer.ts'

interface Props {
  socket: WebSocket | null
  joined: boolean
  sessionNumber: string | null
}

const props = defineProps<Props>()
const { leaveRoom } = useMultiplayer()

function handleLeave() {
  if (props.socket && props.socket.readyState === WebSocket.OPEN) {
    props.socket.send(JSON.stringify({ type: 'leaveRoom' }))
    console.log('🟡 Demande de départ envoyée au serveur...')
  }

  // Appelle la fonction du composable pour mettre à jour les états globaux
  leaveRoom()
}
</script>

<template>
  <button class="leave-button" @click="handleLeave">Quitter le salon</button>
</template>

<style scoped>
.leave-button {
  background: linear-gradient(135deg, #ff5252, #ff1744);
  color: white;
  font-family: Cascadia Code;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}
.leave-button:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
}
</style>
