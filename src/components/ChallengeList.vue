<template>
    <div>
      <h2>Challenges</h2>
      <ul>
        <li v-for="challenge in challenges" :key="challenge.id">
          <h3>{{ challenge.title }}</h3>
          <p>{{ challenge.description }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Challenge } from '@/types';
  
  // Simulação de um serviço ou API que retorna uma lista de desafios
  const fetchChallenges = async (): Promise<Challenge[]> => {
    // Substitua isso com uma chamada real à API
    return [
      { id: 1, title: 'Challenge 1', description: 'Description of Challenge 1' },
      { id: 2, title: 'Challenge 2', description: 'Description of Challenge 2' },
    ];
  };
  
  const challenges = ref<Challenge[]>([]);
  
  const loadChallenges = async () => {
    challenges.value = await fetchChallenges();
  };
  
  onMounted(() => {
    loadChallenges();
  });
  </script>
  
  <style scoped>
  /* Adicione estilos específicos para a lista de desafios aqui */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 1em;
  }
  </style>
  