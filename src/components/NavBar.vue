<template>
  <v-app-bar app color="var(--primary-color)" dark>
    <!-- Botão do Menu (Mobile) -->
    <v-app-bar-nav-icon
      @click.stop="toggleMenu"
      class="d-md-none"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>
      <router-link to="/" class="brand-logo">
        <img src="@/assets/lsc-logo.jpeg" :alt="$t('navbar.logoAlt')" class="logo" style="width: 80px; height: auto;" />
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Seletor de Idioma -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="setLanguage('pt')">
          <v-avatar size="36">
            <img src="" alt="Português" />
          </v-avatar>
          <v-list-item-title>{{ $t('navbar.portuguese') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setLanguage('en')">
          <v-avatar size="36">
            <img src="" alt="English" />
          </v-avatar>
          <v-list-item-title>{{ $t('navbar.english') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Links do Menu (Desktop) -->
    <v-row class="d-none d-md-flex">
      <v-btn
        v-for="(item, index) in filteredMenuItems"
        :key="index"
        :to="item.path"
        text
        color="var(--text-color)"
      >
        {{ $t(`navbar.${item.name}`) }}
      </v-btn>

      <!-- Avatar e Logout (Desktop) -->
      <template v-if="isUserLoggedIn">
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar size="36">
                <img :src="userAvatar" :alt="$t('navbar.userAvatar')" class="avatar-img" />
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToUserSettings" link>
              <template #prepend>
                <v-icon>mdi-account</v-icon>
              </template>
              <v-list-item-title>{{ $t('navbar.profile') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logoutUser" link>
              <template #prepend>
                <v-icon color="var(--secondary-color)">mdi-logout</v-icon>
              </template>
              <v-list-item-title>{{ $t('navbar.logout') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-row>
  </v-app-bar>
  <!-- Menu Lateral (Mobile) -->
  <v-navigation-drawer
    v-model="menuCollapsed"
    :location="mobile ? 'bottom' : 'right'"
    temporary
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
        <v-list-item-title>{{ $t(`navbar.${item.name}`) }}</v-list-item-title>
      </v-list-item>

      <!-- Avatar e Logout (Mobile) -->
      <v-divider v-if="isUserLoggedIn"></v-divider>
      <v-list-item
        v-if="isUserLoggedIn"
        @click="goToUserSettings"
        link
      >
        <template #prepend>
          <v-avatar size="36">
            <img :src="userAvatar" :alt="$t('navbar.userAvatar')" class="avatar-img" />
          </v-avatar>
        </template>
        <v-list-item-title>{{ username }}</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="isUserLoggedIn"
        @click="logoutUser"
        link
      >
        <template #prepend>
          <v-icon color="var(--secondary-color)">mdi-logout</v-icon>
        </template>
        <v-list-item-title>{{ $t('navbar.logout') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useDisplay } from 'vuetify';

const menuCollapsed = ref(false);

function toggleMenu() {
  menuCollapsed.value = !menuCollapsed.value;
}

const { locale } = useI18n();
function setLanguage(language) {
  locale.value = language;
}

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'Register', path: '/register' },
  { name: 'Login', path: '/login' },
  { name: 'Ranking', path: '/ranking'}
];

const authStore = useAuthStore();
const router = useRouter();

const username = computed(() => authStore.username);
const userAvatar = computed(() => authStore.avatar);
const isUserLoggedIn = computed(() => authStore.isAuthenticated);

// Remove 'Register' e 'Login' se o usuário estiver logado
const filteredMenuItems = computed(() => {
  if (isUserLoggedIn.value) {
    return menuItems.filter(
      (item) => item.name !== 'Register' && item.name !== 'Login'
    );
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

// Utiliza o composable useDisplay do Vuetify para detectar o dispositivo
const { mobile } = useDisplay();
</script>

<style scoped>
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

.v-app-bar {
  background-color: var(--primary-color);
}

.v-toolbar-title .brand-logo img {
  height: 40px;
}

.v-btn {
  color: var(--text-color);
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-navigation-drawer {
  background-color: var(--primary-color);
}

.v-navigation-drawer .v-list-item {
  color: var(--text-color);
}

.v-navigation-drawer .v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-navigation-drawer .v-icon {
  color: var(--text-color);
}

.submenu-list {
  background-color: var(--primary-color);
}

.submenu-list .v-list-item {
  color: var(--text-color);
}

.submenu-list .v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.submenu-list .v-icon {
  color: var(--text-color);
}

.d-md-none .v-btn {
  color: var(--accent-color);
}
</style>
