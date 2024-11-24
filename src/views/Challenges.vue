<template>
  <div class="container">
    <h1 class="title">{{ $t('challenges.title') }}</h1>

    <!-- Condição para visualização de espera -->
    <div v-if="instanceStore.instanceStatus === 'PENDING'" class="loading-indicator">
      <p>{{ $t('challenges.starting') }}</p>
      <div class="spinner"></div>
    </div>

    <!-- Campo de visualização VNC (iframe) -->
    <div class="viewer" v-if="instanceStore.instanceStatus === 'READY'">
      <h2 class="viewer-title">{{ $t('challenges.viewerTitle') }}</h2>
      <iframe
        :src="instanceURL"
        width="100%"
        height="600"
        frameborder="0"
        allowfullscreen
        class="viewer-frame"
      ></iframe>
    </div>
    <div class="instance-ip">
      <p><strong>{{ $t('challenges.instanceIP') }}</strong> {{ instanceStore.instanceIP }}</p>
    </div>

    <!-- Mensagem de erro ao falhar -->
    <div v-if="instanceStore.instanceStatus === 'FAILED'" class="status-message error">
      <p>{{ $t('challenges.failedMessage') }}</p>
      <button class="retry-btn" @click="retryStartInstance">{{ $t('challenges.retry') }}</button>
    </div>

    <!-- Lista de Desafios -->
    <div class="challenges-section">
      <ChallengeList />
    </div>

    <!-- Botões de controle da instância fixados na lateral direita -->
    <div class="button-column">
      <!-- Botão para iniciar a instância -->
      <div v-if="instanceStore.instanceStatus === 'STOPPED' || instanceStore.instanceStatus === 'FAILED' || instanceStore.instanceStatus === null">
        <button class="btn start-btn" @click="instanceStore.startInstance">{{ $t('challenges.startInstance') }}</button>
      </div>

      <!-- Botões adicionais de controle da instância -->
      <div v-if="instanceStore.instanceStatus === 'PENDING' || instanceStore.instanceStatus === 'READY'">
        <button :disabled="!instanceStore.isInstanceReady" @click="instanceStore.goToInstance" class="btn access-btn">
          {{ $t('challenges.goToInstance') }}
        </button>
        <button @click="instanceStore.updateInstanceStatus" class="btn update-btn">
          {{ $t('challenges.updateStatus') }}
        </button>
        <button @click="instanceStore.stopInstance" class="btn stop-btn">
          {{ $t('challenges.stopInstance') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChallengeList from '@/components/ChallengeList.vue';
import { useInstanceStore } from '@/store/awsInstance';
import { computed, onMounted, onUnmounted } from 'vue';

const instanceStore = useInstanceStore();
const instanceURL = computed(() => instanceStore.instanceIP ? `http://${instanceStore.instanceIP}/vnc_lite.html?password=password` : '');

onMounted(() => {
  instanceStore.fetchInstanceStatus();
});

function retryStartInstance() {
  instanceStore.startInstance();
}

onUnmounted(() => {
  try {
    if (instanceStore.intervalId && instanceStore.intervalId !== null) {
      clearInterval(instanceStore.intervalId);
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

/* Loading Indicator */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #2196f3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.instance-ip {
  text-align: center;
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
}

/* Botão de retry para o erro */
.retry-btn {
  background-color: #ff9800;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
}
</style>
