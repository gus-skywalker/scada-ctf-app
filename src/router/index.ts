import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Challenges from '../views/Challenges.vue';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import Ranking from '@/views/Ranking.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/ranking', component: Ranking },
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

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  
  // Se a rota requer autenticação e o usuário não está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    const token = sessionStorage.getItem('authToken');
    
    // Verificar o token no sessionStorage
    if (token) {
      authStore.token = token;
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
