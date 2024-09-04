<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
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
  
  const username = ref<string>('');
  const password = ref<string>('');
  
  function handleRegister() {
    // Adicione lógica de registro aqui, possivelmente chamando uma API
  }
  </script>
  
  <style scoped>
  /* Adicione estilos específicos para a página de registro aqui */
  </style>
  