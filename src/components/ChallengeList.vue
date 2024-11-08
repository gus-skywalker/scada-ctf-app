<template>
  <div class="challenges-container">
    <h2>Challenges</h2>
    <ul class="challenges-list">
      <li v-for="challenge in challenges" :key="challenge._id" :class="{ 'completed': challenge.completed }">
        <h3>{{ challenge.title }}</h3>
        <p>{{ challenge.description }}</p>

        <!-- Campo de entrada para a flag -->
        <input
          type="text"
          v-model="challenge.userFlag"
          placeholder="Enter your flag"
          :disabled="challenge.completed"
        />
        <button :disabled="challenge.completed || challenge.isValid === true" @click="submitFlag(challenge)">
          Submit
        </button>

        <!-- Mensagem de feedback e exibição da flag -->
        <!-- <p v-if="challenge.completed" class="success-message">
          You already completed this challenge.
        </p> -->
        <p v-if="challenge.completed" class="success-message">Flag is correct!</p>
        <p v-else-if="challenge.isValid === false" class="error-message">Incorrect flag, try again.</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Challenge {
  _id: string;
  title: string;
  description: string;
  userFlag?: string;
  isValid?: boolean;
  completed?: boolean;
  flag?: string;
}

const challenges = ref<Challenge[]>([]);

const fetchChallenges = async (): Promise<Challenge[]> => {
  return await axios.get('/api/challenges/status').then(res => res.data);
};

const loadChallenges = async () => {
  const fetchedChallenges = await fetchChallenges();
  challenges.value = fetchedChallenges.map(challenge => ({
    ...challenge,
    userFlag: challenge.completed ? challenge.flag : ''
  }));
};

const submitFlag = async (challenge: Challenge) => {
  if (challenge.completed) return;

  try {
    const response = await axios.post(`/api/challenges/${challenge._id}/validate`, {
      flag: challenge.userFlag,
    });
    challenge.isValid = response.data.isCorrect;

    if (challenge.isValid) {
      challenge.completed = true;
      challenge.flag = challenge.userFlag;
    }
  } catch (error) {
    console.error("Erro na validação da flag:", error);
    challenge.isValid = false;
  }
};

onMounted(() => {
  loadChallenges();
});
</script>

<style scoped>
.challenges-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  font-size: 24px;
}

.challenges-list {
  list-style-type: none;
  padding: 0;
}

.challenges-list li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.challenges-list li:hover {
  transform: scale(1.02);
}

.challenges-list h3 {
  color: #555;
  font-size: 20px;
  margin-bottom: 8px;
}

.challenges-list p {
  color: #666;
  font-size: 16px;
  margin-bottom: 12px;
}

.challenges-list input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.challenges-list button {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.challenges-list button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.challenges-list button:hover:enabled {
  background-color: #0056b3;
}

.success-message {
  color: green !important;
  font-weight: bold;
}

.error-message {
  color: red !important;
  font-weight: bold;
}

.completed {
  background-color: #e0f7e0;
  border-color: #b3e2b3;
}
</style>
