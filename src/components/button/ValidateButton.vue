<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  to?: string            // route cible si on veut naviguer
  autoNavigate?: boolean // true => router.push(to) au clic
  disabled?: boolean
}>(), {
  label: 'Valider',
  to: '/playervue',
  autoNavigate: true,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'press'): void
}>()

const router = useRouter()

async function handleClick() {
  emit('press')                // toujours émettre l’événement
  if (!props.disabled && props.autoNavigate && props.to) {
    await router.push(props.to)
  }
}

const ariaDisabled = computed(() => props.disabled ? 'true' : 'false')
</script>

<template>
  <button
    class="validate-button"
    :disabled="disabled"
    :aria-disabled="ariaDisabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.validate-button {
  background: linear-gradient(135deg, #ff7043, #fdd835);
  border: none;
  border-radius: 15px;
  padding: 0.8rem 2rem;
  color: #222;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}
.validate-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}
.validate-button:disabled {
  opacity: .6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
