<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  socket: WebSocket | null
  joined: Ref<boolean>
  sessionNumber: Ref<string>
}

const props = defineProps<Props>()

function leaveRoom() {
  if (props.socket && props.socket.readyState === WebSocket.OPEN) {
    props.socket.send(JSON.stringify({ type: 'leaveRoom' }))
    console.log('Départ du salon demandé...')
  }

  props.joined.value = false
  props.sessionNumber.value = ''
}
</script>

<template>
  <button class="leave-button" @click="leaveRoom" style="margin-top: 10px">Quitter le salon</button>
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
