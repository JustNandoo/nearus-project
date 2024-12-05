<template>
  <header class="header bg-blue-primary font-montserrat fixed top-0 w-screen h-20 pt-3 pb-3 items-center z-[1000]"
          :class="{'bg-white': scrolled, 'shadow-lg': scrolled}">
    <nav class="flex justify-between items-center w-full px-8">
      <div>
        <router-link to="/home">
          <img class="w-32" :src="scrolled ? scrolledLogo : logo" alt="logo">
        </router-link>
      </div>
      <div class="flex items-center gap-10 text-xl font-medium text-white ml-39" :class="{'text-change': scrolled}">
        <router-link to="/home">Sewa</router-link>
        <router-link to="/NearusFinance">NearusFinance</router-link>
        <router-link to="/AboutUS">About Us</router-link>

      </div>
      <div class="flex items-center gap-4 relative">
        <router-link v-if="!isLoggedIn" to="/login" class="text-xl font-medium">
          <button class="rounded-button login-button">Login</button>
        </router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="text-xl font-medium">
          <button class="rounded-button register-button">Register</button>
        </router-link>
        <div v-else class="rounded-full gap-5 flex items-center justify-center cursor-pointer" @click="toggleProfileCard">
          <img :src="profilePicture" alt="Profile Picture" class="object-cover rounded-full h-12 w-12">
          <p class="text-xl font-medium text-white" :class="{'text-change': scrolled}">
            Halo, {{ userName }}
          </p>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import logo from '../../assets/images/nearuswhite.png';
import scrolledLogo from '../../assets/images/nearuswhite.png';
import imageProfileDefault from '@/assets/images/profile-pic.png';

const store = useStore();
const router = useRouter();

const scrolled = ref(false);
const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const toggleProfileCard = () => {
  const event = new Event('toggle-profile-card');
  window.dispatchEvent(event);
};

const isLoggedIn = computed(() => store.getters.isLoggedIn);
const userName = computed(() => store.getters.getUser?.name || 'Guest');
const profilePicture = computed(() => store.getters.getUser?.photoprofile || imageProfileDefault);

onMounted(() => {
  store.dispatch('initializeStore');
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header {
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, margin-top 0.3s ease;
}

.bg-blue-primary {
  background-color: #008DDA;
}

.text-change {
  color: white;
}

/* Tambahkan media query di sini */
@media (max-width: 768px) {
  .header nav {
    padding: 0 20px;
  }

  .header .gap-10 {
    display: none; /* Sembunyikan menu di layar kecil */
  }
}

.rounded-button {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.login-button {
  background-color: #3490dc; /* Blue */
  color: white;
  padding: 0.5rem 1rem;
}

.login-button:hover {
  background-color: #2779bd; /* Darker blue */
}

.register-button {
  background-color: #3490dc; /* Blue */
  color: white;
  padding: 0.5rem 1rem;
}

.register-button:hover {
  border-color: #ffffff;
  color: #ffffff;
}
</style>
