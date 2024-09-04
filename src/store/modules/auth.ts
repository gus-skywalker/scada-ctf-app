// store/modules/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(username, password) {
      // Simulação de login
      this.user = { username };
    },
    logout() {removeEventListener
      this.user = null;
    },
  },
});
