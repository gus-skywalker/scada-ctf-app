import { defineStore } from 'pinia';
import axios from 'axios';

export const useChallengesStore = defineStore('challenges', {
  state: () => ({
    challenges: [],  // Lista de desafios
  }),
  actions: {
    async fetchChallenges() {
      try {
        const response = await axios.get('/api/challenges');  // URL da API para obter desafios
        this.challenges = response.data;
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    },
    
    async submitFlag(challengeId: string, flag: string) {
      try {
        const response = await axios.post('/api/challenges/submit', { challengeId, flag });
        // Lógica para lidar com a resposta
        console.log(response.data.message);
      } catch (error) {
        console.error('Error submitting flag:', error);
      }
    },
  },
});
