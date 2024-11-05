<template>
  <v-container class="mt-10" max-width="400px">
    <v-card>
      <v-card-title>Entrar</v-card-title>
      <v-card-subtitle>Acesse sua conta</v-card-subtitle>

      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="E-mail"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary" block>Entrar</v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="goToRegister">Não tem uma conta? Registre-se</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value);
    router.push('/'); // Redireciona após o login bem-sucedido
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Falha ao fazer login. Por favor, verifique suas credenciais.');
  }
}

function goToRegister() {
  router.push('/register');
}
</script>

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
}
</style>
