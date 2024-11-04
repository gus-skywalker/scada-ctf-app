<template>
    <v-container class="mt-10" max-width="600px">
      <v-card>
        <v-card-title>Configurações do Usuário</v-card-title>
        <v-card-subtitle>Altere sua senha</v-card-subtitle>
  
        <v-card-text>
          <v-form @submit.prevent="handlePasswordChange">
            <v-text-field
              v-model="currentPassword"
              label="Senha Atual"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              label="Nova Senha"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirmar Nova Senha"
              type="password"
              required
            ></v-text-field>
  
            <v-btn type="submit" color="primary" class="mt-4">Alterar Senha</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  
  function handlePasswordChange() {
    if (newPassword.value !== confirmPassword.value) {
      alert('As novas senhas não coincidem');
      return;
    }
    // Lógica para alterar a senha no backend (simulação)
    alert('Senha alterada com sucesso!');
  }
  </script>
  
  <style scoped>
  .v-container {
    display: flex;
    justify-content: center;
  }
  </style>
  