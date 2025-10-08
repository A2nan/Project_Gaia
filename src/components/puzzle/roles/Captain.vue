<template>
  <div class="wrap">
    <!-- Toolbar -->
    <div class="toolbar">
      <span class="status" :class="{ ok: solved, ko: !solved }">
        {{ statusText }}
      </span>
    </div>

    <div class="layout">
      <div
        class="board"
        :style="{ width: BOARD_PX + 'px', height: BOARD_PX + 'px' }"
      >
        <!-- Transition entre la grille et l'image -->
        <transition name="fade" mode="out-in">
          <!-- Grille (tant que non résolu) -->
          <div
            v-if="!showReveal"
            key="grid"
            class="board-grid"
            :style="{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }"
          >
            <div
              v-for="(slot, idx) in slots"
              :key="idx"
              class="cell"
              @dragover.prevent
              @drop="onDrop({ to: { type: 'grid', index: idx } })"
            >
              <span class="cell-index">{{ idx + 1 }}</span>

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

          <!-- Image unique (quand résolu) -->
          <div
            v-else
            key="reveal"
            class="grid-reveal"
            :style="{ backgroundImage: `url(${IMAGE_URL})` }"
          />
        </transition>
      </div>

      <!-- Bac des pièces -->
      <div class="tray" @dragover.prevent @drop="onDrop({ to: { type: 'tray', index: null } })">
        <h3>Pièces</h3>
        <div class="tray-list">
          <div
            v-for="(piece, i) in tray"
            :key="piece.letter + '-' + i"
            class="tile small"
            draggable="true"
            @dragstart="onDragStart({ from: { type: 'tray', index: i } })"
            :title="piece.letter"
          >
            <span class="label">{{ piece.letter }}</span>
          </div>
        </div>
        <p class="hint">Glisse-dépose une pièce sur une case de la grille.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue'
import { SIZE, BOARD_PX, LETTERS, IMAGE_URL } from '@/game/config'
import { gameState, initLetterMappingOnce } from '@/game/state'

interface Piece { letter: string }
interface DragSource { type: 'tray' | 'grid'; index: number }
interface DropTarget { type: 'tray' | 'grid'; index: number | null }

const slots: Ref<(Piece | null)[]> = ref(Array.from({ length: SIZE * SIZE }, () => null))
const tray: Ref<Piece[]> = ref([])
const dragSource: Ref<DragSource | null> = ref(null)

onMounted(() => {
  initLetterMappingOnce()
  shuffle()
})

function shuffle(): void {
  // reset grille
  slots.value = Array.from({ length: SIZE * SIZE }, () => null)
  // on garde le mapping lettre->morceau ; on mélange seulement l'ordre du bac
  tray.value = LETTERS.map((letter) => ({ letter }))
  for (let i = tray.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tray.value[i], tray.value[j]] = [tray.value[j], tray.value[i]]
  }
}

function onDragStart(payload: { from: DragSource }): void {
  dragSource.value = payload.from
}

function onDrop(payload: { to: DropTarget }): void {
  if (!dragSource.value) return
  const from = dragSource.value
  const to = payload.to

  if (from.type === 'tray' && to.type === 'grid' && to.index !== null) {
    const piece = tray.value.splice(from.index, 1)[0]
    const displaced = slots.value[to.index]
    slots.value[to.index] = piece
    if (displaced) tray.value.push(displaced)
  } else if (from.type === 'grid' && to.type === 'grid' && to.index !== null) {
    const a = from.index
    const b = to.index
    ;[slots.value[a], slots.value[b]] = [slots.value[b], slots.value[a]]
  } else if (from.type === 'grid' && to.type === 'tray') {
    const piece = slots.value[from.index]
    if (piece) {
      tray.value.push(piece)
      slots.value[from.index] = null
    }
  }
  dragSource.value = null
}

const solved = computed(() =>
  slots.value.every(
    (slot, i) =>
      slot && gameState.letterToCorrectIndex[slot.letter as (typeof LETTERS)[number]] === i,
  ),
)

// 👉 Affichage auto de l'image + message dès que résolu
const showReveal = computed(() => solved.value)

const statusText = computed(() => {
  return solved.value ? 'Mot secret : APPLE' : ''
})
</script>

<style scoped>
.wrap {
  display: grid;
  gap: 1rem;
  justify-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.status { font-weight: 600; font-size: 1.5rem; }
.status.ok { color: #8aff8a; }

.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Conteneur de la grille */
.board {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  padding: 4px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1/1;
}

/* Grille interne (quand non résolu) */
.board-grid {
  display: grid;
  height: 100%;
  width: 100%;
}

/* Cellules */
.cell {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Numéro de case centré (1..9) */
.cell-index {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  color: #ffd700;
  text-shadow: 0 0 6px rgba(255, 215, 0, 0.6);
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}

/* Pièces (noires avec lettre dorée) */
.tile {
  position: relative;
  border-radius: 8px;
  background: #000;
  color: #ffd700;
  font-weight: 900;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
  user-select: none;
  cursor: grab;
  transition: all 0.2s ease;
  box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  z-index: 2;
}
.tile:hover { transform: scale(1.05); box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
.tile:active { cursor: grabbing; }

/* Bac des pièces */
.tray {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}
.tray h3 {
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  text-align: center;
}
.tray-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.15);
}
.tile.small {
  width: 70px;
  height: 70px;
  font-size: 2rem;
  background: #111;
  color: #ffd700;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  transition: transform 0.2s ease;
}
.tile.small:hover { transform: scale(1.05); box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }

.hint { color: #bbb; font-size: 0.9rem; text-align: center; margin-top: 0.3rem; }

/* Image qui couvre exactement la grille quand résolu */
.grid-reveal {
  position: absolute;
  inset: 0;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  z-index: 5;
  pointer-events: none;
}
</style>
