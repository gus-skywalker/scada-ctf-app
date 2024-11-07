<template>
  <div class="container">
    <h1 class="title">Challenges</h1>

    <!-- Campo de visualização VNC (iframe) -->
    <div v-if="instanceStore.isInstanceReady" class="viewer">
      <h2 class="viewer-title">Instance Viewer</h2>
      <iframe
        :src="`http://${instanceStore.instanceIP}/vnc_lite.html?password=password`"
        width="100%"
        height="600"
        frameborder="0"
        allowfullscreen
        class="viewer-frame"
      ></iframe>
    </div>

    <!-- Lista de Desafios -->
    <div class="challenges-section">
      <ChallengeList />
    </div>

    <!-- Botões de controle da instância fixados na lateral direita -->
    <div class="button-column">
      <!-- Botão para iniciar a instância -->
      <div v-if="instanceStore.instanceStatus === 'STOPPED' || instanceStore.instanceStatus === 'FAILED' || instanceStore.instanceStatus === null">
        <button class="btn start-btn" @click="instanceStore.startInstance">Start Instance</button>
      </div>

      <!-- Botões adicionais de controle da instância -->
      <div v-if="instanceStore.instanceStatus === 'PENDING' || instanceStore.instanceStatus === 'READY'">
        <button :disabled="!instanceStore.isInstanceReady" @click="instanceStore.goToInstance" class="btn access-btn">
          Go to My Instance
        </button>
        <button @click="instanceStore.updateInstanceStatus" class="btn update-btn">Update Status</button>
        <button @click="instanceStore.stopInstance" class="btn stop-btn">Stop Instance</button>
      </div>

      <!-- Mensagens de feedback sobre o status da instância -->
      <div class="status-message" v-if="instanceStore.instanceStatus === 'PENDING'">
        Instance is starting...
      </div>
      <div class="status-message" v-if="instanceStore.instanceStatus === 'READY' && !instanceStore.isInstanceReady">
        Instance is ready. You can now view it below.
      </div>
      <div class="status-message error" v-if="instanceStore.instanceStatus === 'FAILED'">
        Instance failed to start. Please try again.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChallengeList from '@/components/ChallengeList.vue';
import { useInstanceStore } from '@/store/awsInstance';
import { onMounted, onUnmounted } from 'vue';

const instanceStore = useInstanceStore();

onMounted(() => {
  instanceStore.fetchInstanceStatus();
});

onUnmounted(() => {
  try {
    if (instanceStore.intervalId && instanceStore.intervalId.value !== null) {
      clearInterval(instanceStore.intervalId.value);
    }
  } catch (error) {
    console.error("Error clearing interval:", error);
  }
});
</script>

<style scoped>
/* Container principal */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Título centralizado */
.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* Área de visualização (viewer) */
.viewer {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.viewer-title {
  text-align: center;
  padding: 10px;
  background-color: #2196f3;
  color: white;
  font-size: 1.2rem;
}

.viewer-frame {
  border: none;
}

/* Seção de desafios (abaixo do viewer) */
.challenges-section {
  margin-top: 30px;
}

/* Botões fixados na lateral direita em coluna */
.button-column {
  position: fixed;
  top: 150px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
}

/* Estilo dos botões */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
}

/* Cores para os botões de controle */
.start-btn {
  background-color: #4caf50;
}

.access-btn {
  background-color: #2196f3;
}

.update-btn {
  background-color: #ff9800;
}

.stop-btn {
  background-color: #f44336;
}

/* Mensagens de status */
.status-message {
  font-size: 0.9rem;
  margin-top: 10px;
  color: #555;
  width: 100%;
}

.status-message.error {
  color: #f44336;
}
</style>
