<template>
  <div class="wrap">
    <h2>🦊 Volpe — Modèle numéroté</h2>
    <div class="model">
      <img :src="IMAGE_URL" alt="La Création d’Adam" />
      <div class="grid">
        <div v-for="i in 9" :key="i" class="cell">{{ i }}</div>
      </div>
    </div>
    <p class="note">
      Décris chaque case (1→9) au Capitaine : couleurs, formes, mains, ciel, personnages…
    </p>
  </div>
</template>

<script setup lang="ts">
import { IMAGE_URL } from '@/game/config'
</script>

<style scoped>
.wrap { display: grid; gap: 12px; }
.model {
  position: relative;
  width: 600px; height: 600px;
  border-radius: 10px; overflow: hidden;
  box-shadow: 0 0 0 1px #ddd inset;
}
.model img {
  width: 100%; height: 100%; object-fit: cover;
}
.grid {
  position: absolute; inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: #fff; font-weight: 800; font-size: 20px;
}
.cell {
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,.14);
  border: 1px dashed rgba(255,255,255,.35);
  text-shadow: 0 1px 2px rgba(0,0,0,.6);
}
.note { color: #555; }
</style>
