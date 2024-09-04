<template>
  <v-app-bar app color="green darken-2" dark>
    <v-toolbar-title>
      <router-link to="/" class="brand-logo">
        <img src="" alt="Logo" class="logo" />
      </router-link>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-btn icon @click="toggleMenu" class="d-md-none">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    
    <v-row class="d-none d-md-flex">
      <v-btn v-for="item in menuItems" :key="item.path" :to="item.path" text>
        {{ item.name }}
      </v-btn>
    </v-row>
    
    <v-navigation-drawer v-model="menuCollapsed" class="d-md-none" app right temporary>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.path" @click="toggleMenu">
          <v-list-item-title>
            <router-link :to="item.path">{{ item.name }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';

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
</script>

<style scoped>
.logo {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.v-navigation-drawer {
  background-color: #2e7d32;
}
.v-list-item-title {
  color: #fff;
}
</style>
