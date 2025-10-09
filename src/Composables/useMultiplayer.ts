import { ref } from 'vue'

const socket = ref<WebSocket | null>(null)
const currentRoomCode = ref<string | null>(null)
const playerCount = ref<number>(0)
const joined = ref(false)
const playerRole = ref<string | null>(null) // Nouveau : rôle choisi par le joueur

export function useMultiplayer() {
  function connect(roomCode?: string) {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) return

    socket.value = new WebSocket('ws://10.0.3.241:8080')

    socket.value.onopen = () => {
      console.log('[WebSocket] Connecté au serveur')
      if (roomCode) joinRoom(roomCode)
    }

    socket.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      switch (data.type) {
        case 'roomCreated':
          currentRoomCode.value = data.roomCode
          playerCount.value = data.playerCount
          joined.value = true
          console.log(`[WebSocket] Salon créé : ${data.roomCode}`)
          break
        case 'roomJoined':
          currentRoomCode.value = data.roomCode
          playerCount.value = data.playerCount
          joined.value = true
          console.log(
            `[WebSocket] Rejoint le salon : ${data.roomCode} (${data.playerCount}/3 joueurs)`,
          )
          break
        case 'info':
          console.log(`[WebSocket] Info : ${data.message}`)
          if (data.playerCount !== undefined) playerCount.value = data.playerCount
          break
        case 'playerRoles': // Nouveau : réception des rôles des joueurs
          console.log('[WebSocket] Rôles des joueurs :', data.roles)
          break
        case 'roomLeft':
          leaveRoom()
          console.log('[WebSocket] Salon quitté')
          break
        case 'error':
          console.error(`[WebSocket] Erreur : ${data.message}`)
          break
      }
    }

    socket.value.onerror = (err) => console.error('[WebSocket] Erreur', err)
    socket.value.onclose = () => {
      console.log('[WebSocket] Déconnecté du serveur')
      joined.value = false
      currentRoomCode.value = null
      playerCount.value = 0
      playerRole.value = null

      // 🔁 Reconnexion automatique si la page est encore active
      setTimeout(() => {
        if (!joined.value) {
          console.log('[WebSocket] Tentative de reconnexion...')
          connect(currentRoomCode.value || undefined)
        }
      }, 2000)
    }
  }

  function createRoom() {
    if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
      connect()
      setTimeout(() => {
        socket.value?.send(JSON.stringify({ type: 'createRoom' }))
      }, 300)
    } else {
      socket.value.send(JSON.stringify({ type: 'createRoom' }))
    }
  }

  function joinRoom(code: string) {
    currentRoomCode.value = code
    if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
      connect(code)
      setTimeout(() => {
        socket.value?.send(JSON.stringify({ type: 'joinRoom', roomCode: code }))
      }, 300)
    } else {
      socket.value.send(JSON.stringify({ type: 'joinRoom', roomCode: code }))
    }
  }

  function leaveRoom() {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify({ type: 'leaveRoom' }))
    }
    joined.value = false
    currentRoomCode.value = null
    playerCount.value = 0
    playerRole.value = null
  }

  // Nouveau : définir le rôle et l’envoyer au serveur
  function setRole(roleId: string) {
    playerRole.value = roleId
    if (socket.value && socket.value.readyState === WebSocket.OPEN && currentRoomCode.value) {
      socket.value.send(
        JSON.stringify({
          type: 'setRole',
          roomCode: currentRoomCode.value,
          role: roleId,
        }),
      )
    }
  }

  return {
    socket,
    currentRoomCode,
    playerCount,
    joined,
    playerRole, // Nouveau
    connect,
    createRoom,
    joinRoom,
    leaveRoom,
    setRole, // Nouveau
  }
}
