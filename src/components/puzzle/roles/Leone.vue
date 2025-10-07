<template>
  <div class="wrap">
    <h2>🦁 Leone — Liste des pièces (A→I)</h2>
    <div class="list">
      <div v-for="letter in LETTERS" :key="letter" class="item">
        <div class="thumb" :style="thumbStyle(letter)"></div>
        <div class="meta">
          <div class="title">
            Pièce <strong>{{ letter }}</strong>
          </div>
          <div class="desc">{{ descriptions[letter] }}</div>
        </div>
      </div>
    </div>
    <p class="note">
      Indique au Capitaine quelle <strong>lettre</strong> correspond à ce que Volpe décrit pour une
      <strong>case</strong> donnée.
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { IMAGE_URL, SIZE, BOARD_PX, LETTERS, DEFAULT_DESCRIPTIONS } from '@/game/config'
import { gameState } from '@/game/state'

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
    width: '120px',
    height: '120px',
    borderRadius: '8px',
    boxShadow: '0 0 0 1px #ddd inset',
    backgroundRepeat: 'no-repeat',
  }
}
</script>

<style scoped>
.wrap {
  display: grid;
  gap: 12px;
}
.list {
  display: grid;
  gap: 10px;
  max-width: 680px;
}
.item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  align-items: center;
  background: #fafafa;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 0 1px #eee inset;
}
.meta .title {
  font-weight: 700;
}
.meta .desc {
  color: #555;
}
.note {
  color: #666;
}
</style>
