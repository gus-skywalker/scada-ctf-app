// store/instance.ts
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import axios from 'axios';

export const useInstanceStore = defineStore('instance', () => {
    const instanceStatus = ref<string | null>(null);
      // const instanceStatus = 'READY';
    const instanceIP = ref<string | null>(null);
  const isInstanceReady = ref(false);

  // Inicialize intervalId como uma ref nula
  const intervalId = ref<number | null>(null);

  watch(instanceStatus, (newStatus) => {
    localStorage.setItem('instanceStatus', newStatus || '');
  });

  watch(instanceIP, (newIP) => {
    localStorage.setItem('instanceIP', newIP || '');
  });

  async function startInstance() {
    try {
      const response = await axios.post('/api/aws/start-instance');
      const data = response.data;
      instanceStatus.value = data.status;
      alert(data.message);

      // Atribuir o intervalo ao intervalId.value
      intervalId.value = window.setInterval(fetchInstanceStatus, 15000);
    } catch (error) {
      console.error("Error starting instance:", error);
    }
  }

  async function fetchInstanceStatus() {
    try {
      const response = await axios.get('/api/aws/status-instance');
      const data = response.data;
    
      console.log(data);
      instanceStatus.value = data.status;
      instanceIP.value = data.instanceIP;
  
      if (data.status === 'READY') {
        isInstanceReady.value = true;
        if (intervalId.value !== null) clearInterval(intervalId.value);
      } else if (data.status === 'FAILED') {
        if (intervalId.value !== null) clearInterval(intervalId.value);
      }
    } catch (error) {
      console.error("Error fetching instance status:", error);
    }
  }
  
  async function stopInstance() {
    if (!confirm("Are you sure you want to stop the instance?")) return;

    try {
      const response = await axios.post('/api/aws/stop-instance');
      if (response.status === 200) {
        alert("Instance stopped successfully.");
        instanceStatus.value = 'STOPPED';
        isInstanceReady.value = false;
      } else {
        alert("Failed to stop instance.");
      }
    } catch (error) {
      console.error("Error stopping instance:", error);
    }
  }

  async function updateInstanceStatus() {
    await fetchInstanceStatus();
  }

  function goToInstance() {
    if (instanceIP.value) {
      window.open(`http://${instanceIP.value}`, '_blank');
    } else {
      alert('Instance not ready. Please try again later.');
    }
  }

  return {
    instanceStatus,
    intervalId,
    instanceIP,
    isInstanceReady,
    startInstance,
    fetchInstanceStatus,
    stopInstance,
    updateInstanceStatus,
    goToInstance,
  };
});
