import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
<<<<<<< HEAD
import store from './store'; // Import the store

createApp(App).use(router).use(store).mount('#app');
=======
import store from './store';

const app = createApp(App)
store.dispatch('initializeStore');


app.use(router)
app.use(store);
app.mount('#app')
>>>>>>> 430c1643a4168488054d7f1e4137faf344442214
