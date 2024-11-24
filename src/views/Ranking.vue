<template>
    <div class="ranking-page">
      <h1>Ranking de Jogadores</h1>
      <p>Confira os melhores jogadores e suas pontuações no CTF!</p>
  
      <v-text-field
        v-model="search"
        label="Buscar jogador"
        variant="outlined"
        clearable
        class="mb-4"
      ></v-text-field>
  
      <v-data-table
        :headers="headers"
        :items="filteredPlayers"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        class="elevation-1"
        dense
      >
        <template #item.avatar="{ item }">
          <v-avatar>
            <img :src="item.avatar" alt="Avatar" />
          </v-avatar>
        </template>
      </v-data-table>
  
      <p v-if="loading" class="loading-text">Carregando...</p>
      <p v-if="error" class="error-text">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  import axios from 'axios';
  
  // Dados da tabela
  const headers = [
    { text: 'Posição', value: 'position' },
    { text: 'Avatar', value: 'avatar' },
    { text: 'Usuário', value: 'username' },
    { text: 'Pontuação', value: 'score' },
  ];
  
  // Estado
  const players = ref([]);
  const search = ref('');
  const page = ref(1);
  const itemsPerPage = ref(10);
  const loading = ref(true);
  const error = ref<string | null>(null);
  let intervalId: number | null = null;
  
  // Computed: Jogadores filtrados
  const filteredPlayers = computed(() => {
    const lowerCaseSearch = search.value.toLowerCase();
    return players.value
      .filter((player) =>
        player.username.toLowerCase().includes(lowerCaseSearch)
      )
      .map((player, index) => ({
        position: index + 1,
        ...player,
      }));
  });
  
  // Função para buscar o ranking
  async function fetchRanking() {
    try {
      const response = await axios.get('/api/ranking');
      players.value = response.data.map((user: any, index: number) => ({
        position: index + 1,
        ...user,
      }));
      loading.value = false;
    } catch (err) {
      console.error(err);
      error.value = 'Não foi possível carregar o ranking. Tente novamente mais tarde.';
      loading.value = false;
    }
  }
  
  // Atualizar ranking a cada 30 segundos
  function startRankingUpdate() {
    newFunction(); // 30 segundos


      function newFunction() {
          intervalId = setInterval(fetchRanking, 30000);
      }
  }
  
  // Parar a atualização ao sair da página
  function stopRankingUpdate() {
    if (intervalId) clearInterval(intervalId);
  }
  
  // Buscar dados ao carregar a página
  onMounted(() => {
    fetchRanking();
    startRankingUpdate();
  });
  
  // Limpar o intervalo ao desmontar
  onBeforeUnmount(() => {
    stopRankingUpdate();
  });
  </script>
  
  <style scoped>
  .ranking-page {
    padding: 20px;
  }
  
  .loading-text {
    color: #666;
    text-align: center;
    font-size: 16px;
  }
  
  .error-text {
    color: red;
    text-align: center;
    font-size: 16px;
  }
  
  .mb-4 {
    margin-bottom: 16px;
  }
  </style>
  