import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Challenges from '../views/Challenges.vue';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/challenges', component: Challenges, meta: { requiresAuth: true } },
  {
    path: '/user-settings',
    name: 'UserSettings',
    component: () => import('@/views/UserSettings.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Se a rota requer autenticação e o usuário não está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    const token = localStorage.getItem('authToken');
    
    // Verificar o token no localStorage
    if (token) {
      authStore.token = token;
      authStore.isAuthenticated = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next(); // Continuar com a navegação
    } else {
      next('/login'); // Redirecionar para login se não houver token
    }
  } else {
    next();
  }
});

export default router;
