import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/reset-password/:token',
      component: () => import('../views/resetpass.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/user-register',
      name: 'user-register',
      component: () => import('../views/UserRegisterView.vue')
    },
    {
      path: '/mitra-register',
      name: 'mitra-register',
      component: () => import('../views/MitraRegisterView.vue')
    },
    

  ]
})

export default router