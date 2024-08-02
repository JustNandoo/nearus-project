import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
const isAuthenticated = () => {
  return !!store.state.token;
};

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
      path: '/RegistKost',
      name: 'RegistKost',
      component: () => import('../views/RegisterKosView.vue')
    },
    {
      path: '/verif',
      name: 'verif',
      component: () => import('../views/verifEmail.vue')
    },
    {
      path: '/verify-email/:token/:email',
      name: 'emails.verify',
      component: () => import('../views/emailverification.vue'),
      props: true,
    },
    {
      path: '/profile',
      name: 'profilescreen',
      component: () => import('../views/Profile/ProfileScreen.vue')
    },
    {
      path: '/privatedata',
      name: 'privatedata',
      component: () => import('../views/Profile/PrivateData.vue')
    },
    {
      path: '/passworddata/:id',
      name: 'passworddata',
      component: () => import('../views/Profile/ProfilePassword.vue'),
      props: true
    },
    {
      path: '/detail-kost/:id',
      name: 'detailkost',
      component: () => import('../views/DetailPageView.vue'),
      props: true
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: () => import('../views/AboutUsView.vue')
    },
    {
      path: '/dashboard-data',
      name: 'DataDasboard',
      component: () => import('../views/DataDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'DashboardDashboard',
      component: () => import('../views/DashboardDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-kosku',
      name: 'DashboardKosku',
      component: () => import('../views/KoskuDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-settings',
      name: 'DashboardSettings',
      component: () => import('../views/SettingsDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-profile',
      name: 'DashboardProfile',
      component: () => import('../views/ProfileDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/PrivacyPolicy',
      name: 'PrivacyPolicy',
      component: () => import('../views/PrivacyPolicyView.vue')
    },
    {
      path: '/PaymentReview',
      name: 'PaymentReview',
      component: () => import('../views/PaymentReview.vue')
    },
    {
      path: '/PaymentPage',
      name: 'PaymentPage',
      component: () => import('../views/PaymentPage.vue')
    },
    {
      path: '/dashboard-chat',
      name: 'DashboardChat',
      component: () => import('../views/DashboardChat.vue')
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
