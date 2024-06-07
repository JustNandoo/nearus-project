import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

store.dispatch('initializeStore');

app.use(router)
app.use(store)
app.mount('#app')
