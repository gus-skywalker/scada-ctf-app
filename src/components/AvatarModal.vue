<!-- AvatarModal.vue -->
<template>
    <v-dialog
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      max-width="600px"
    >
      <v-card>
        <v-card-title>Escolha um Avatar</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(url, index) in avatarOptions"
              :key="index"
              cols="4"
              class="text-center"
            >
              <v-avatar
                :size="80"
                :class="{ 'selected-avatar': selectedAvatar === url }"
                @click="selectAvatar(url)"
              >
                <img :src="url" alt="Avatar Option" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="emitClose">Cancelar</v-btn>
          <v-btn color="primary" @click="confirmSelection">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: Boolean,
    username: String,
    currentAvatar: String,
  });
  
  const emits = defineEmits(['update:modelValue', 'close', 'confirm']);
  
  const selectedAvatar = ref(props.currentAvatar || null);
  const avatarOptions = ref([]);
  
  function generateAvatarOptions() {
    const baseUrl = 'https://api.dicebear.com/6.x';
    const styles = ['avataaars', 'bottts', 'pixel-art', 'lorelei', 'adventurer'];
    const seed = props.username || 'user';
    avatarOptions.value = styles.map(
      (style) => `${baseUrl}/${style}/svg?seed=${seed}`
    );
  }
  
  function selectAvatar(url) {
    selectedAvatar.value = url;
  }
  
  function confirmSelection() {
    emits('confirm', selectedAvatar.value);
    emits('update:modelValue', false); // Fecha o modal
  }
  
  function emitClose() {
    emits('update:modelValue', false); // Fecha o modal
  }
  
  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal) {
        generateAvatarOptions();
      }
    }
  );
  </script>
  
  <style scoped>
  .selected-avatar {
    border: 2px solid #1976d2;
  }
  </style>
  