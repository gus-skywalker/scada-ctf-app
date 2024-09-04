<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
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
  import { useAuthStore } from '@/store/modules/auth';
  
  const username = ref<string>('');
  const password = ref<string>('');
  
  const authStore = useAuthStore();
  
  function handleLogin() {
    authStore.login(username.value, password.value);
  }
  </script>
  
  <style scoped>
  /* Adicione estilos específicos para a página de login aqui */
  </style>
  