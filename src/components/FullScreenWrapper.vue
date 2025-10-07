<script setup lang="ts">
interface FullScreenProps {
  background?: string
}

const props = defineProps<FullScreenProps>()
</script>

<template>
  <div
    class="full-screen-wrapper"
    :style="{
      backgroundImage: props.background ? `url(${props.background})` : 'none',
    }"
  >
    <slot></slot>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* empêche le scroll global */
  width: 100%;
  height: 100%;
}

/* ✅ Le wrapper remplit bien l’écran, sans écraser le contenu */
.full-screen-wrapper {
  position: absolute; /* au lieu de fixed */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
