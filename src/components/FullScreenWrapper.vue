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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

:global(html, body) {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
