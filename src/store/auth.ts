import { defineStore } from 'pinia';
import axios from 'axios';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(sessionStorage.getItem('authToken'));
  const username = ref<string | null>(sessionStorage.getItem('username'));
  const avatar = ref<string | null>(sessionStorage.getItem('avatar'));

  const isAuthenticated = computed(() => !!token.value);

  interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    avatar: string;
  }
  
  async function login(email: string, password: string) {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      token.value = response.data.token;
      username.value = response.data.username;
      avatar.value = response.data.avatar;

      // Salve os dados no localSession
      sessionStorage.setItem('authToken', token.value ?? '');
      sessionStorage.setItem('username', username.value ?? '');
      sessionStorage.setItem('avatar', avatar.value ?? '');

      // Configuração do cabeçalho Authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    } catch (error) {
      console.error('Login failed:', error);

      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Falha ao fazer login. Verifique suas credenciais.');
      } else {
        throw new Error('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
    
  }

  async function register(user: RegisterPayload) {
    try {
      await axios.post('/api/auth/register', user);
      alert('Registration successful! You can now login.');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  function setUsername(newUsername: string) {
    username.value = newUsername;
    sessionStorage.setItem('username', newUsername);
  }

  function setAvatar(newAvatarUrl: string) {
    avatar.value = newAvatarUrl;
    sessionStorage.setItem('avatar', newAvatarUrl);
  }

  function logout() {
    token.value = null;
    username.value = null;
    avatar.value = null;

    // Remover dados do sessionStorage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('avatar');
    
    // Remover o cabeçalho Authorization
    delete axios.defaults.headers.common['Authorization'];
  }

  // Inicializar o cabeçalho Authorization se houver um token salvo
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

  return {
    token,
    isAuthenticated,
    username,
    avatar,
    register,
    login,
    setAvatar,
    setUsername,
    logout,
  };
});
