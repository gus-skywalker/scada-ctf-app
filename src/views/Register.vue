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
      <div>
        <label>Avatar Selecionado:</label>
        <img v-if="selectedAvatar" :src="selectedAvatar" alt="Avatar Selecionado" class="selected-avatar" />
        <button type="button" @click="openAvatarModal">Escolher Avatar</button>
      </div>
      <button type="submit">Register</button>
    </form>

    <!-- Modal para escolha de avatar -->
    <div v-if="showAvatarModal" class="modal-overlay">
      <div class="modal">
        <h2>Escolha um Avatar</h2>
        <div class="avatar-grid">
          <img
            v-for="(url, index) in avatarOptions"
            :key="index"
            :src="url"
            @click="selectAvatar(url)"
            :class="{ selected: selectedAvatar === url }"
            class="avatar-option"
          />
        </div>
        <button @click="confirmAvatarSelection">Confirmar</button>
        <button @click="closeAvatarModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const authStore = useAuthStore();
const showAvatarModal = ref(false);
const avatarOptions = ref<string[]>([]);
const selectedAvatar = ref<string | null>(null);

async function handleRegister() {
  if (!selectedAvatar.value) {
    alert("Por favor, selecione um avatar.");
    return;
  }

  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
    avatar: selectedAvatar.value // Usa o avatar selecionado
  };

  await authStore.register(payload);
}

function selectAvatar(url: string) {
  selectedAvatar.value = url; // Define o avatar selecionado
  console.log("Avatar selecionado:", selectedAvatar.value); // Log para verificar o avatar selecionado
}

function openAvatarModal() {
  if (!username.value) {
    alert("Por favor, insira um nome de usuário antes de selecionar um avatar.");
    return;
  }
  generateAvatarOptions(); // Gera opções de avatar com base no nome de usuário atual
  showAvatarModal.value = true;
}

function confirmAvatarSelection() {
  showAvatarModal.value = false;
}

function closeAvatarModal() {
  showAvatarModal.value = false;
}

function generateAvatarOptions() {
  const baseUrl = 'https://api.dicebear.com/9.x';
  const styles = ['avataaars', 'bottts', 'pixel-art', 'lorelei', 'adventurer'];
  const seed = username.value;
  avatarOptions.value = styles.map(
    (style) => `${baseUrl}/${style}/svg?seed=${seed}`
  );
}
</script>

<style scoped>
/* Estilos para o modal e grid de avatares */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.avatar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.avatar-option {
  width: 80px;
  height: 80px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border 0.3s;
}

.avatar-option.selected {
  border-color: #007bff;
}

.selected-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>
