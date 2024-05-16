import { createRouter, createWebHistory } from 'vue-router'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/reset-password',
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
    {
      path: '/verif',
      name: 'verif',
      component: () => import('../views/verifEmail.vue')
    },
    {
      path: '/verify-email/:token',
      name: 'emails.verify',
      component: () => import('../views/emailverification.vue'),
      props: true,
    },
    {
      path: '/verification',
      name: 'verification',
      component: () => import('../views/verifEmail.vue'),
      props: true,
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('../views/resetPassView.vue'),
      props: true,
    },

  ]
})

export default router