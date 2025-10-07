<script setup lang="ts">
// Définition d'une interface pour les props
interface FullScreenProps {
  background?: string
}

// Utilisation de defineProps avec l'interface
const props = defineProps<FullScreenProps>()
</script>

<template>
  <div
    class="full-screen-wrapper"
    :style="{
      background: props.background ? `url(${props.background})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.full-screen-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
</style>
