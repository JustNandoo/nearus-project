<template>
  <header class="header bg-white font-montserrat fixed top-0 w-screen bg-h-20 pt-3 pb-3 items-center z-[1000] shadow-lg"
          :class="{'bg-blue-primary': scrolled, 'shadow-lg': scrolled}">
    <nav class="flex justify-between items-center w-full px-8">
      <div>
        <router-link to="/home">
          <img class="w-32" :src="scrolled ? scrolledLogo : logo" alt="logo">
        </router-link>
      </div>
      <div class="flex items-center gap-10 text-xl font-medium text-black" :class="{'text-change': scrolled}">
        <router-link to="/home">Sewa</router-link>
        <router-link to="/">NearusFinance</router-link>
        <router-link to="/AboutUS">About Us</router-link>
      </div>
      <div class="flex items-center gap-2 relative">
        <div class="rounded-full gap-5 flex items-center justify-center cursor-pointer" @click="toggleProfileCard">
          <img :src="profilePicture" alt="Profile Picture" class="object-cover rounded-full h-12 w-12">
          <p class="text-xl font-medium text-black" :class="{'text-change': scrolled}">Halo, {{ userName }}</p>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useStore } from 'vuex';
import logo from '../assets/images/nearus.png';
import scrolledLogo from '../assets/images/nearuswhite.png';
import imageProfileDefault from '@/assets/images/profile-pic.png';

const store = useStore();
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};


const toggleProfileCard = () => {
  const event = new Event('toggle-profile-card');
  window.dispatchEvent(event);
};

// Computed properties to get user data from the Vuex store
const profilePicture = computed(() => store.state.user?.photoprofile || imageProfileDefault);
const userName = computed(() => store.state.user?.name || 'Guest');

onMounted(() => {
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
</style>
