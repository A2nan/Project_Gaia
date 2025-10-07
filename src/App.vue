<template>
  <div class="container">
    <!-- Vue actuelle selon la route -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
/* Plus besoin de gérer currentView ici, Vue Router s'en charge */
</script>

<style>
.container {
  max-width: 700px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}
</style>
