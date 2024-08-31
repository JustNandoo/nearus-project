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
      component: () => import('../views/HomeView/HomeView.vue'),
    },
    {
      path: '/Kos',
      name: 'Kos',
      component: () => import('../views/HomeView/FullViewKos.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginRegister/Login/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/reset-password',
      component: () => import('../views/LoginRegister/ResetPassword/resetpass.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/LoginRegister/RegisterPages/RegisterView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/user-register',
      name: 'user-register',
      component: () => import('../views/LoginRegister/RegisterPages/UserRegisterView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/mitra-register',
      name: 'mitra-register',
      component: () => import('../views/LoginRegister/RegisterPages/MitraRegisterView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/RegistKost',
      name: 'RegistKost',
      component: () => import('../views/LoginRegister/RegisterPages/RegisterKosView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/verif',
      name: 'verif',
      component: () => import('../views/LoginRegister/VerificationPage/verifEmail.vue')
    },
    {
      path: '/verify-email/:token/:email',
      name: 'emails.verify',
      component: () => import('../views/LoginRegister/VerificationPage/emailverification.vue'),
      props: true
    },
    {
      path: '/profile',
      name: 'profilescreen',
      component: () => import('../views/Profile/ProfileScreen.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/passworddata/:id',
      name: 'passworddata',
      component: () => import('../views/Profile/ProfilePassword.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/detail-kost/:id',
      name: 'detailkost',
      component: () => import('../views/DetailPage/DetailPageView.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/AboutUs',
      name: 'AboutUs',
      component: () => import('../views/AboutUs/AboutUsView.vue')
    },
    {
      path: '/dashboard-data',
      name: 'DataDasboard',
      component: () => import('../views/Dashboard_pemilik/DataDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'DashboardDashboard',
      component: () => import('../views/Dashboard_pemilik/DashboardDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-kosku',
      name: 'DashboardKosku',
      component: () => import('../views/Dashboard_pemilik/KoskuDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-settings',
      name: 'DashboardSettings',
      component: () => import('../views/Dashboard_pemilik/SettingsDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-profile',
      name: 'DashboardProfile',
      component: () => import('../views/Dashboard_pemilik/ProfileDashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/PrivacyPolicy',
      name: 'PrivacyPolicy',
      component: () => import('../views/PrivacyPolicy/PrivacyPolicyView.vue')
    },
    {
      path: '/PaymentReview',
      name: 'PaymentReview',
      component: () => import('../views/Payment/PaymentReview.vue')
    },
    {
      path: '/PaymentPage',
      name: 'PaymentPage',
      component: () => import('../views/Payment/PaymentPage.vue')
    },
    {
      path: '/dashboard-chat',
      name: 'DashboardChat',
      component: () => import('../views/Dashboard_pemilik/DashboardChat.vue')
    },
    {
      path: '/NearusFinance',
      name: 'NearusFinance',
      component: () => import('../views/NearusFinance/NearusFinanceView.vue')
    },
    {
      path: '/NearusFinance2/:id',
      name: 'NearusFinance2',
      component: () => import('../views/NearusFinance/NearusFinanceDetail.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/dashboard-kosku-detail/:ownerId',
      name: 'DashboardDetailKosku',
      component: () => import('../views/Dashboard_pemilik/DetailKoskuDashboard.vue')
    },
    {
      path: '/dashboard-kosku-detail-product/:id',
      name: 'DetailProduct',
      component: () => import('../views/DetailProduct.vue')
    },
    {
      path: '/chat-user',
      name: 'ChatUser',
      component: () => import('../views/HomeView/ChatUser.vue')
    },
    {
      path: '/search-page',
      name: 'search-page',
      component: () => import('../views/HomeView/SearchPage.vue')
    },
    {
      path: '/dashboard-pesanan',
      name: 'DashboardPesanan',
      component: () => import('../views/Dashboard_pemilik/PesananDashboard.vue')
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.state.token;
  const userRole = store.state.role;

  console.log(`Navigating to: ${to.path}`);
  console.log(`Is authenticated: ${isAuthenticated}`);
  console.log(`User role: ${userRole}`);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // User is not authenticated, redirect to login
      next({ name: 'login' });
    } else {
      // User is authenticated, check for role-based access
      if (userRole === 'Owner' && to.path === '/home') {
        // Owners cannot access home
        console.log('Redirecting owner from /home to /dashboard');
        next({ name: 'DashboardDashboard' });
      } else if (userRole !== 'Owner' && to.path.startsWith('/dashboard')) {
        // Regular users cannot access dashboard
        console.log('Redirecting user from dashboard to /home');
        next({ name: 'home' });
      } else {
        // Allow access if no restriction applies
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isAuthenticated) {
      // Authenticated users should not access guest-only pages
      next({ name: 'home' });
    } else {
      // Allow access to guest-only pages if not authenticated
      next();
    }
  } else {
    // Allow access to all other routes
    next();
  }
});




export default router;
