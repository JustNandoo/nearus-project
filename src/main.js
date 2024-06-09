import './assets/main.css'
import VueApexCharts from "vue3-apexcharts";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

store.dispatch('initializeStore');

app.use(router)
app.use(store)
app.use(VueApexCharts)

app.component('apexchart', VueApexCharts)

app.mount('#app')
