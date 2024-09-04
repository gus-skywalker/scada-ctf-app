<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
