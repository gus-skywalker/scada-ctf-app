<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/modules/auth';

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const authStore = useAuthStore();

async function handleRegister() {
  await authStore.register(username.value, email.value, password.value);
}
</script>

<style scoped>
/* Adicione estilos específicos para a página de registro aqui */
</style>
