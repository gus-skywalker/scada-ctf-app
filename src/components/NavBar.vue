<template>
  <v-app-bar app color="var(--primary-color)" dark>
    <v-toolbar-title>
      <router-link to="/" class="brand-logo">
        <img src="" alt="Logo" class="logo" />
      </router-link>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>

    <!-- Links do Menu (Desktop) -->
    <v-row class="d-none d-md-flex">
      <v-btn v-for="item in filteredMenuItems" :key="item.path" :to="item.path" text color="var(--text-color)">
        {{ item.name }}
      </v-btn>
    </v-row>

    <!-- Avatar e Logout (Desktop) -->
    <template v-if="isUserLoggedIn && !isMobile">
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="36">
              <img :src="userAvatar" alt="User Avatar" class="avatar-img" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="goToUserSettings">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logoutUser">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Botão do Menu (Mobile) -->
    <v-btn icon @click="toggleMenu" class="d-md-none">
      <v-icon color="var(--accent-color)">mdi-menu</v-icon>
    </v-btn>

    <!-- Menu Lateral (Mobile) -->
    <v-navigation-drawer v-model="menuCollapsed" app temporary right>
      <v-list>
        <v-list-item v-for="item in filteredMenuItems" :key="item.path" @click="toggleMenu">
          <v-list-item-title>
            <router-link :to="item.path" class="drawer-link">{{ item.name }}</router-link>
          </v-list-item-title>
        </v-list-item>

        <!-- Avatar e Logout (Mobile) -->
        <template v-if="isUserLoggedIn">
          <v-divider></v-divider>
          <v-list-item @click="goToUserSettings">
            <v-avatar size="36">
              <img :src="userAvatar" alt="User Avatar" class="avatar-img" />
            </v-avatar>
            <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item @click="logoutUser">
            <v-icon color="var(--secondary-color)" left>mdi-logout</v-icon>
            <v-list-item-subtitle>Logout</v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const menuCollapsed = ref(false);

function toggleMenu() {
  menuCollapsed.value = !menuCollapsed.value;
}

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'Register', path: '/register' },
  { name: 'Login', path: '/login' },
];

const authStore = useAuthStore();
const router = useRouter();

const username = computed(() => authStore.username);
const userAvatar = computed(() => authStore.avatar);
const isUserLoggedIn = computed(() => authStore.isAuthenticated);

// Remove 'Register' e 'Login' se o usuário estiver logado
const filteredMenuItems = computed(() => {
  if (isUserLoggedIn.value) {
    return menuItems.filter(item => item.name !== 'Register' && item.name !== 'Login');
  }
  return menuItems;
});

function logoutUser() {
  authStore.logout();
  router.push('/login');
}

function goToUserSettings() {
  router.push('/user-settings');
}

// Detecta se é dispositivo móvel
const isMobile = ref(false);

function updateIsMobile() {
  isMobile.value = window.innerWidth < 960;
}

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});
</script>

<style scoped>
.logo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.drawer-link {
  color: var(--text-color);
  text-decoration: none;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.v-navigation-drawer {
  background-color: var(--primary-color);
}

.v-list-item-title {
  color: var(--text-color);
}

.v-icon {
  color: var(--text-color);
}

/* Ajustes para o menu lateral */
.v-navigation-drawer .v-list-item {
  color: var(--text-color);
}

.v-navigation-drawer .v-icon {
  color: var(--text-color);
}
</style>
