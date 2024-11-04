import { defineStore } from 'pinia';
import axios from 'axios';

export const useRankingStore = defineStore('ranking', {
  state: () => ({
    ranking: [],  // Lista de classificações
  }),
  actions: {
    async fetchRanking() {
      try {
        const response = await axios.get('/api/ranking');  // URL da API para obter ranking
        this.ranking = response.data;
      } catch (error) {
        console.error('Error fetching ranking:', error);
      }
    },
  },
});
