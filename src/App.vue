<template>
  <div class="container">
    <!-- Top bar globale (bouton quitter + chrono + numéro de session) -->
    <SessionTopBar />

    <!-- Vue actuelle selon la route -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import SessionTopBar from '@/components/SessionTopBar.vue'
</script>

<style>
.container {
  max-width: 700px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}
</style>
