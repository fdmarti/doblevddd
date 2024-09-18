import './assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Esto esta para importar todos los components de common que yo quiera

import { ComponentsStack } from '@/config/globalComponents';
const components = Object.entries(ComponentsStack);

for (let i = 0; i < components.length; i++) {
  app.component(components[i][0], components[i][1]);
}

// -----------------------------

app.use(createPinia());
app.use(router);
app.use(Toast);

app.mount('#app');
