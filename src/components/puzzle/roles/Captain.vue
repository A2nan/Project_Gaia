<template>
  <div class="wrap">
    <h2>👑 Capitaine — “Cappella Puzzle”</h2>

    <div class="toolbar">
      <button @click="shuffle">Mélanger les pièces</button>
      <button @click="validate">Valider</button>
      <span class="status" :class="{ ok: solved, ko: validated && !solved }">
        {{ statusText }}
      </span>
    </div>

    <div class="layout">
      <!-- Grille 3x3 -->
      <div
        class="board"
        :style="{
          width: BOARD_PX + 'px',
          height: BOARD_PX + 'px',
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`
        }"
      >
        <div
          v-for="(slot, idx) in slots"
          :key="idx"
          class="cell"
          @dragover.prevent
          @drop="onDrop({ to: { type: 'grid', index: idx } })"
        >
          <div
            v-if="slot"
            class="tile"
            draggable="true"
            @dragstart="onDragStart({ from: { type: 'grid', index: idx } })"
            :title="slot.letter"
          >
            <span class="label">{{ slot.letter }}</span>
          </div>
        </div>
      </div>

      <!-- Pièces restantes (bac) -->
      <div class="tray" @dragover.prevent @drop="onDrop({ to: { type: 'tray', index: null } })">
        <h3>Pièces</h3>
        <div class="tray-list">
          <div
            v-for="(p, i) in tray"
            :key="p.letter + '-' + i"
            class="tile small"
            draggable="true"
            @dragstart="onDragStart({ from: { type: 'tray', index: i } })"
            :title="p.letter"
          >
            <span class="label">{{ p.letter }}</span>
          </div>
        </div>
        <p class="hint">Glisse-dépose une pièce sur une case de la grille.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SIZE, BOARD_PX } from '@/game/config'
import { gameState, randomizeLetters } from '@/game/state.ts'

// état
const slots = ref(Array.from({ length: SIZE * SIZE }, () => null as null | { letter: string })) // 9 cases
const tray = ref<{ letter: string }[]>([])
const dragSource = ref<null | { type: 'tray'|'grid', index: number }>(null)
const validated = ref(false)

// init : mapping lettres↔morceaux et bac mélangé
function shuffle() {
  validated.value = false
  // 1) Nouveau mapping (lettres -> index correct)
  const shuffledLetters = randomizeLetters()
  // 2) Vider la grille
  slots.value = Array.from({ length: SIZE * SIZE }, () => null)
  // 3) Remplir le bac avec les lettres (ordre arbitraire → on re-mélange)
  tray.value = shuffledLetters.map(letter => ({ letter }))
  for (let i = tray.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tray.value[i], tray.value[j]] = [tray.value[j], tray.value[i]]
  }
}
shuffle()

function onDragStart(payload: { from: { type: 'tray'|'grid', index: number } }) {
  dragSource.value = payload.from
}

function onDrop(payload: { to: { type: 'tray'|'grid', index: number | null } }) {
  if (!dragSource.value) return
  const from = dragSource.value
  const to = payload.to

  if (from.type === 'tray' && to.type === 'grid' && typeof from.index === 'number' && typeof to.index === 'number') {
    const piece = tray.value.splice(from.index, 1)[0]
    const displaced = slots.value[to.index]
    slots.value[to.index] = piece
    if (displaced) tray.value.push(displaced)
  } else if (from.type === 'grid' && to.type === 'grid' && typeof from.index === 'number' && typeof to.index === 'number') {
    const a = from.index, b = to.index
    const tmp = slots.value[a]
    slots.value[a] = slots.value[b]
    slots.value[b] = tmp
  } else if (from.type === 'grid' && to.type === 'tray' && typeof from.index === 'number') {
    const piece = slots.value[from.index]
    if (piece) {
      tray.value.push(piece)
      slots.value[from.index] = null
    }
  }
  dragSource.value = null
}

const solved = computed(() =>
  slots.value.every((slot, i) => slot && gameState.letterToCorrectIndex[slot.letter] === i)
)

function validate() { validated.value = true }

const statusText = computed(() => {
  if (!validated.value) return 'En cours…'
  return solved.value ? '✅ Bravo, puzzle complété !' : '❌ Mauvaise disposition'
})
</script>

<style scoped>
.wrap { display: grid; gap: 16px; }
.toolbar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.status { font-weight: 600; }
.status.ok { color: #2e7d32; }
.status.ko { color: #c62828; }

.layout { display: grid; grid-template-columns: auto 260px; gap: 16px; align-items: start; }

.board {
  display: grid;
  background: #eee;
  padding: 4px;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #ddd inset;
}
.cell {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
}

/* Bloc noir + lettre centrée ET grosse */
.tile {
  position: relative;
  border-radius: 8px;
  user-select: none;
  cursor: grab;
  background: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px #000 inset;
}
.tile:active { cursor: grabbing; }
.label {
  font-weight: 900;
  font-size: clamp(28px, 8vw, 64px);
  letter-spacing: 1px;
}

.tray { background: #fafafa; border-radius: 10px; padding: 10px; box-shadow: 0 0 0 1px #e8e8e8 inset; }
.tray h3 { margin: 0 0 8px; }
.tray-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.tile.small { min-height: 100px; }
.hint { color: #666; font-size: 12px; margin-top: 8px; }
</style>
