<template>
  <div>
    <h2>Challenges</h2>
    <ul>
      <li v-for="challenge in challenges" :key="challenge.id">
        <h3>{{ challenge.title }}</h3>
        <p>{{ challenge.description }}</p>

        <!-- Campo de entrada para a flag -->
        <input
          type="text"
          v-model="challenge.userFlag"
          placeholder="Enter your flag"
        />
        <button @click="submitFlag(challenge)">Submit</button>

        <!-- Mensagem de validação -->
        <p v-if="challenge.isValid === true" style="color: green;">Flag is correct!</p>
        <p v-if="challenge.isValid === false" style="color: red;">Incorrect flag, try again.</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Challenge {
  id: number;
  title: string;
  description: string;
  userFlag?: string; // Flag inserida pelo usuário
  isValid?: boolean; // Status de validação da flag
}

const challenges = ref<Challenge[]>([]);

// Carrega os desafios (sem as flags corretas)
const fetchChallenges = async (): Promise<Challenge[]> => {
  // Substitua isso com uma chamada real à API que não retorna as flags corretas
  return await axios.get('/api/challenges').then(res => res.data);
};

const loadChallenges = async () => {
  challenges.value = await fetchChallenges();
};

// Função para enviar e validar a flag
const submitFlag = async (challenge: Challenge) => {
  try {
    const response = await axios.post(`/api/challenges/${challenge.id}/validate`, {
      flag: challenge.userFlag,
    });
    challenge.isValid = response.data.isValid;
  } catch (error) {
    console.error("Erro na validação da flag:", error);
    challenge.isValid = false;
  }
};

onMounted(() => {
  loadChallenges();
});
</script>
