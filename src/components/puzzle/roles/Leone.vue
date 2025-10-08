<template>
  <div class="wrap">

    <div class="list">
      <div v-for="letter in LETTERS" :key="letter" class="item">
        <div class="thumb" :style="thumbStyle(letter)">
          <div class="overlay">
            <span class="label">{{ letter }}</span>
          </div>
        </div>
        <div class="meta">
          <div class="piece-title">
            Pièce <strong>{{ letter }}</strong>
          </div>
          <div class="desc">{{ descriptions[letter] }}</div>
        </div>
      </div>
    </div>
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
    backgroundRepeat: 'no-repeat',
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 900px;
}

/* Carte de chaque pièce */
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  width: 180px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.item:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
}

/* Image miniature bien visible */
.thumb {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
}

.thumb:hover .overlay {
  background: rgba(0, 0, 0, 0.05);
}

.label {
  color: #ffd700;
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

/* Texte de la pièce */
.meta {
  margin-top: 0.8rem;
}
.piece-title {
  font-size: 1.2rem;
  color: #ffd700;
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.desc {
  font-size: 0.95rem;
  color: #e0e0e0;
  line-height: 1.2rem;
}
</style>
