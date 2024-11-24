import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.ts';
import './style.css'
import vuetify from './plugins/vuetify';
import './plugins/axiosConfig';
import { i18n } from './i18n';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n)
app.use(vuetify);

app.mount('#app');
