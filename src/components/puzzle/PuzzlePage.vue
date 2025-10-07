<template>
  <div class="wrap">
    <div class="header">
      <h2>Puzzle</h2>
      <div class="controls">
        <label>
          Taille :
          <select v-model.number="currentSize" @change="reset()">
            <option v-for="n in [3, 4, 5]" :key="n" :value="n">{{ n }}x{{ n }}</option>
          </select>
        </label>
        <button @click="reset()">Mélanger</button>
        <span class="moves">Coups : {{ moves }}</span>
      </div>
    </div>

    <div
      class="board"
      :style="{
        width: boardPx + 'px',
        height: boardPx + 'px',
        display: 'grid',
        gridTemplateColumns: `repeat(${currentSize}, 1fr)`,
        gap: '2px',
        background: '#eaeaea',
        padding: '2px',
        borderRadius: '8px',
        userSelect: 'none',
      }"
      @dragover.prevent
    >
      <div
        v-for="(tile, idx) in tiles"
        :key="tile.id"
        class="tile"
        draggable="true"
        @dragstart="onDragStart(idx)"
        @drop="onDrop(idx)"
        :style="tileStyle(tile)"
      />
    </div>

    <p v-if="isSolved" class="success">Bravo ! Puzzle terminé 🎉</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'

const props = defineProps({
  id: { type: [String, Number], required: true },
  img: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg',
  },
  size: { type: Number, default: 3 },
})

const boardPx = 600
const currentSize = ref(props.size)
const imgUrl = ref(props.img)

const tiles = ref([])
const dragFrom = ref(null)
const moves = ref(0)

const tileStyle = (tile) => {
  const n = currentSize.value
  const tilePx = boardPx / n
  const col = tile.correct % n
  const row = Math.floor(tile.correct / n)
  return {
    width: tilePx + 'px',
    height: tilePx + 'px',
    backgroundImage: `url(${imgUrl.value})`,
    backgroundSize: `${boardPx}px ${boardPx}px`,
    backgroundPosition: `-${col * tilePx}px -${row * tilePx}px`,
    backgroundRepeat: 'no-repeat',
    borderRadius: '6px',
    boxShadow: '0 0 0 1px #ddd inset',
    cursor: 'grab',
  }
}

const isSolved = computed(() => tiles.value.every((t, i) => t.correct === i))

function createTiles() {
  const n = currentSize.value
  const total = n * n
  const arr = Array.from({ length: total }, (_, i) => ({
    id: crypto?.randomUUID?.() || `${i}-${Math.random()}`,
    correct: i,
  }))

  // Mélange Fisher–Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  tiles.value = arr
}

function onDragStart(fromIdx) {
  dragFrom.value = fromIdx
}

function onDrop(toIdx) {
  if (dragFrom.value === null) return
  if (toIdx === dragFrom.value) {
    dragFrom.value = null
    return
  }

  const a = dragFrom.value
  const b = toIdx
  const copy = tiles.value.slice()
  ;[copy[a], copy[b]] = [copy[b], copy[a]]
  tiles.value = copy
  dragFrom.value = null
  moves.value++
}

function reset() {
  moves.value = 0
  createTiles()
}

onMounted(reset)

watch(
  () => props.img,
  (v) => {
    imgUrl.value = v
  },
)
watch(
  () => props.size,
  (v) => {
    currentSize.value = v
    reset()
  },
)
</script>

<style scoped>
.wrap {
  display: grid;
  gap: 16px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.controls {
  display: flex;
  gap: 12px;
  align-items: center;
}
.moves {
  font-weight: 600;
}
.success {
  font-weight: 600;
  color: #2e7d32;
}
.tile:active {
  cursor: grabbing;
}
</style>
