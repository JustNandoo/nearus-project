import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import store from './store'; // Import the store

createApp(App).use(router).use(store).mount('#app');
