import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const isAuthenticated = ref<boolean>(false);
  const instanceIP = ref<string | null>(null);
  
  async function login(email: string, password: string) {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      token.value = response.data.token;
      isAuthenticated.value = true;
      
      // Salvar o token no localStorage ou sessionStorage
      localStorage.setItem('authToken', token.value);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    } catch (error) {
      console.error('Login failed:', error);
      isAuthenticated.value = false;
    }
  }

  async function fetchSessionInstance(this: any) {
    try {
      const response = await axios.get('/api/instances/session');
      this.instanceIP = response.data.instanceIP;
    } catch (error) {
      console.error('Error fetching instance session:', error);
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      await axios.post('/api/auth/register', { username, email, password });
      alert('Registration successful! You can now login.');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  function logout() {
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  }

  return {
    token,
    isAuthenticated,
    login,
    register,
    logout,
  };
});
