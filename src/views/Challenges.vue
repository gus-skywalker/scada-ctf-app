<template>
    <div>
      <h1>Challenges</h1>
      <button @click="goToInstance">Go to My Instance</button>
      <ChallengeList />
    </div>
  </template>
  
<script lang="ts" setup>
  import ChallengeList from '@/components/ChallengeList.vue';
  import { useAuthStore } from '@/store/auth';

  const authStore = useAuthStore();

  function goToInstance() {
    if (authStore.instanceIP) {
      window.location.href = `http://${authStore.instanceIP}`;
    } else {
      alert('Instance not ready. Please try again later.');
    }
}
</script>
  
<style scoped>
/* Adicione estilos específicos para a página de desafios aqui */
</style>
  