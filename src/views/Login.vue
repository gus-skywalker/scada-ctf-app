<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const email = ref<string>('');
const password = ref<string>('');
const authStore = useAuthStore();

async function handleLogin() {
  await authStore.login(email.value, password.value);
}
</script>

<style scoped>
/* Adicione estilos específicos para a página de login aqui */
</style>
