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
      <v-btn
        v-for="(item, index) in filteredMenuItems"
        :key="index"
        :to="item.path"
        text
        color="var(--text-color)"
      >
        {{ item.name }}
      </v-btn>
    </v-row>

    <!-- Avatar e Logout (Desktop) -->
    <v-menu v-if="isUserLoggedIn && !isMobile" offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="36">
            <img :src="userAvatar" alt="User Avatar" class="avatar-img" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="submenu-list">
        <v-list-item @click="goToUserSettings" link title="Perfil">
          <template #prepend>
            <v-icon>mdi-account</v-icon>
          </template>
        </v-list-item>
        <v-list-item @click="logoutUser" link title="Logout">
          <template #prepend>
            <v-icon color="var(--secondary-color)">mdi-logout</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Botão do Menu (Mobile) -->
    <v-btn icon @click="toggleMenu" class="d-md-none">
      <v-icon color="var(--accent-color)">mdi-menu</v-icon>
    </v-btn>

    <!-- Menu Lateral (Mobile) -->
    <v-navigation-drawer
      v-model="menuCollapsed"
      <!-- app
      temporary
      right
      class="d-md-none" -->
    >
      <v-list>
        <!-- Itens do Menu -->
        <v-list-item
          v-for="(item, index) in filteredMenuItems"
          :key="index"
          :to="item.path"
          link
          @click="toggleMenu"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Avatar e Logout (Mobile) -->
        <v-divider v-if="isUserLoggedIn"></v-divider>
        <v-list-item
          v-if="isUserLoggedIn"
          @click="goToUserSettings"
          link
          :title="username"
        >
          <template #prepend>
            <v-avatar size="36">
              <img :src="userAvatar" alt="User Avatar" class="avatar-img" />
            </v-avatar>
          </template>
        </v-list-item>
        <v-list-item
          v-if="isUserLoggedIn"
          @click="logoutUser"
          link
          title="Logout"
        >
          <template #prepend>
            <v-icon color="var(--secondary-color)">mdi-logout</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
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

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>
<style scoped>
/* Estilos gerais */
.logo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.brand-logo {
  display: flex;
  align-items: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Estilos para o App Bar */
.v-app-bar {
  background-color: var(--primary-color);
}

.v-toolbar-title .brand-logo img {
  height: 40px;
}

/* Estilos para os botões do menu (Desktop) */
.v-btn {
  color: var(--text-color);
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Estilos para o Menu Lateral (Mobile) */
.v-navigation-drawer {
  background-color: var(--primary-color);
}

.v-navigation-drawer .v-list-item {
  color: black;
}

.v-navigation-drawer .v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-navigation-drawer .v-icon {
  color: black;
}

/* Estilos para o Submenu do Avatar */
.submenu-list {
  background-color: var(--primary-color);
}

.submenu-list .v-list-item {
  color: black);
}

.submenu-list .v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.submenu-list .v-icon {
  color: black;
}

/* Estilos para o botão do menu (Mobile) */
.d-md-none .v-btn {
  color: var(--accent-color);
}
</style>
