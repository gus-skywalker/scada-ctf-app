<template>
  <v-container class="mt-10" max-width="600px">
    <v-card>
      <v-card-title>Registrar-se</v-card-title>
      <v-card-subtitle>Crie sua conta</v-card-subtitle>

      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="username"
            label="Nome de Usuário"
            :rules="[usernameRule]"
            required
          ></v-text-field>

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
            :rules="[passwordRule]"
            required
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirmar Senha"
            type="password"
            :rules="[confirmPasswordRule]"
            required
          ></v-text-field>

          <div class="text-center mb-4">
            <v-avatar size="80">
              <img
                v-if="selectedAvatar"
                :src="selectedAvatar"
                alt="Avatar Selecionado"
              />
            </v-avatar>
            <div>
              <v-btn color="primary" @click="openAvatarModal">
                Escolher Avatar
              </v-btn>
            </div>
          </div>

          <v-btn type="submit" color="primary" block>Registrar</v-btn>
        </v-form>

        <!-- Modal para escolha de avatar -->
        <AvatarModal
          v-model="showAvatarModal"
          :username="username"
          :currentAvatar="selectedAvatar"
          @confirm="handleAvatarConfirm"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="goToLogin">Já tem uma conta? Entrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import AvatarModal from '@/components/AvatarModal.vue';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showAvatarModal = ref(false);
const selectedAvatar = ref(null);

const usernameRule = (value) => !!value || 'Nome de usuário é obrigatório';
const passwordRule = (value) => {
  if (value && value.length < 6) return 'A senha deve ter pelo menos 6 caracteres';
  return true;
};
const confirmPasswordRule = (value) => value === newPassword.value || 'As senhas não coincidem';

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem. Por favor, tente novamente.');
    return;
  }
  if (!selectedAvatar.value) {
    alert('Por favor, selecione um avatar.');
    return;
  }

  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
    avatar: selectedAvatar.value,
  };

  try {
    await authStore.register(payload);
    router.push('/'); // Redireciona após o registro bem-sucedido
  } catch (error) {
    console.error('Erro ao registrar:', error);
    alert('Falha ao registrar. Por favor, tente novamente.');
  }
}

function openAvatarModal() {
  if (!username.value) {
    alert('Por favor, insira um nome de usuário antes de selecionar um avatar.');
    return;
  }
  showAvatarModal.value = true;
}

function handleAvatarConfirm(avatarUrl) {
  selectedAvatar.value = avatarUrl;
}

function goToLogin() {
  router.push('/login');
}
</script>

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
}

.text-center {
  text-align: center;
}
</style>
