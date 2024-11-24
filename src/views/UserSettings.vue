<template>
  <v-container class="mt-10" max-width="600px">
    <v-card>
      <v-card-title>{{ $t('userSettings.title') }}</v-card-title>
      <v-card-subtitle>{{ $t('userSettings.subtitle') }}</v-card-subtitle>

      <v-card-text>
        <v-form @submit.prevent="handleUserUpdate">
          <!-- Campo para atualizar o nome de usuário -->
          <v-text-field
            v-model="newUsername"
            :label="$t('userSettings.newUsernameLabel')"
            :rules="[usernameRule]"
          ></v-text-field>

          <!-- Campos para atualizar a senha -->
          <v-text-field
            v-model="currentPassword"
            :label="$t('userSettings.currentPasswordLabel')"
            type="password"
            :rules="[passwordRule]"
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            :label="$t('userSettings.newPasswordLabel')"
            type="password"
            :rules="[passwordRule]"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :label="$t('userSettings.confirmPasswordLabel')"
            type="password"
            :rules="[confirmPasswordRule]"
          ></v-text-field>

          <!-- Seção para atualizar o avatar -->
          <div class="text-center">
            <v-avatar size="100" class="mb-4">
              <img :src="selectedAvatar || authStore.avatar" :alt="$t('userSettings.currentAvatarAlt')" />
            </v-avatar>
            <div>
              <v-btn color="primary" @click="openAvatarModal">
                {{ $t('userSettings.changeAvatarButton') }}
              </v-btn>
            </div>
          </div>

          <!-- Botão para salvar todas as alterações -->
          <v-btn type="submit" color="primary" class="mt-4" block>
            {{ $t('userSettings.saveButton') }}
          </v-btn>
        </v-form>

        <!-- Modal para escolha de avatar -->
        <AvatarModal
          v-model="showAvatarModal"
          :username="authStore.username"
          :currentAvatar="selectedAvatar || authStore.avatar"
          @confirm="handleAvatarConfirm"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import AvatarModal from '@/components/AvatarModal.vue';
import axios from 'axios';

const authStore = useAuthStore();

const newUsername = ref(authStore.username); // Inicializa com o nome de usuário atual
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const showAvatarModal = ref(false);
const selectedAvatar = ref(null);

// Regras de validação
const usernameRule = (value) => !!value || 'Nome de usuário é obrigatório';
const passwordRule = (value) => {
  if (value && value.length < 6) return 'A senha deve ter pelo menos 6 caracteres';
  return true;
};
const confirmPasswordRule = (value) => value === newPassword.value || 'As senhas não coincidem';

function openAvatarModal() {
  showAvatarModal.value = true;
}

function handleAvatarConfirm(avatarUrl) {
  selectedAvatar.value = avatarUrl;
}

async function handleUserUpdate() {
  const updates = {};

  // Verifica se o nome de usuário foi alterado
  if (newUsername.value && newUsername.value !== authStore.username) {
    updates.username = newUsername.value;
  }

  // Verifica se o avatar foi alterado
  if (selectedAvatar.value && selectedAvatar.value !== authStore.avatar) {
    updates.avatar = selectedAvatar.value;
  }

  // Verifica se a senha foi alterada
  if (newPassword.value) {
    if (!currentPassword.value) {
      alert('Por favor, insira sua senha atual para alterar a senha.');
      return;
    }
    if (newPassword.value !== confirmPassword.value) {
      alert('As novas senhas não coincidem.');
      return;
    }
    updates.password = newPassword.value;
    updates.currentPassword = currentPassword.value;
  }

  // Verifica se há atualizações para enviar
  if (Object.keys(updates).length === 0) {
    alert('Nenhuma alteração para salvar.');
    return;
  }

  try {
    // const token = authStore.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-auth-token': token,
      },
    };

    const response = await axios.patch('/api/auth/update', updates, config);

    // Atualiza o authStore com os novos dados
    if (updates.username) {
      authStore.setUsername(response.data.user.username);
    }
    if (updates.avatar) {
      authStore.setAvatar(response.data.user.avatar);
    }
    // Opcional: se a senha foi alterada, você pode deslogar o usuário ou solicitar um novo login

    alert('Informações atualizadas com sucesso!');
    // Limpa os campos de senha
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (error) {
    const errorMessage = error.response?.data?.msg || 'Ocorreu um erro. Por favor, tente novamente.';
    console.error('Erro ao atualizar as informações:', errorMessage);
    alert(errorMessage);
  }
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
