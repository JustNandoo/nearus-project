<template>
  <header class="header bg-white font-montserrat fixed top-0 w-screen bg- h-20 pt-3 pb-3 items-center z-[1000] shadow-lg"
          :class="{'bg-blue-primary': scrolled, 'shadow-lg': scrolled}">
    <nav class="flex justify-between items-center w-[92%] mx-auto mr-32">
      <div class="ml-60">
        <router-link to="/home">
          <img class="w-32" :src="scrolled ? scrolledLogo : logo" alt="logo">
        </router-link>
      </div>
      <div class="mr-96">
        <ul class="flex items-center gap-10 text-xl font-medium text-black" :class="{'text-change': scrolled}">
          <li><router-link to="/home">Sewa</router-link></li>
          <li><router-link to="/">NearusFinance</router-link></li>
          <li><router-link to="/AboutUS">About Us</router-link></li>
        </ul>
      </div>
      <div class="flex items-center justify-between gap-2 mr-48 relative">
        <div class="rounded-full gap-5 flex items-center justify-center cursor-pointer" @click="toggleProfileCard">
          <img :src="profilePicture" alt="Profile Picture" class="object-cover rounded-full h-12 w-12">
          <p class="text-xl font-medium text-black" :class="{'text-change': scrolled}">Halo, Calvin Aprilio Hariyanto</p>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import logo from '../assets/images/nearus.png';
import scrolledLogo from '../assets/images/nearuswhite.png';
import profilePicture from '../assets/images/tesimg1.jpeg';

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const toggleProfileCard = () => {
  const event = new Event('toggle-profile-card');
  window.dispatchEvent(event);
};

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

.shadow-lg {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
