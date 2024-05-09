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
      path: '/logtest',
      name: 'testview',
      component: () => import('../views/testview.vue')
    },
    {
      path: '/verify-email/:token/:email',
      name: 'emails.verify',
      component: () => import('../views/emailverification.vue'),
      props: true,
    },
    // {
    //   path: '/resend-verification/:email',
    //   name: 'emails.resendVerification',
    //   component: ResendVerificationComponent,
    // },
  ]
})

export default router