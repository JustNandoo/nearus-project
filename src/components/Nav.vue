<template>
  <header class="header font-montserrat fixed w-full bg-transparent h-20 pt-3 pb-3 items-center z-[1000]" :class="{'bg-white': scrolled, 'shadow-lg': scrolled}">
    <nav class="flex justify-between items-center w-[92%] mx-auto mr-32">
      <div class="ml-60">
        <router-link to="/home">
          <img class="w-32 cursor-pointer" :src="logo" alt="logo">
        </router-link>
      </div>
      <div class="mr-96">
        <ul class="flex items-center gap-10 text-xl font-medium text-white" :class="{'text-change': scrolled}">
          <li><router-link to="/home">Sewa</router-link></li>
          <li><a href="#">NearusFinance</a></li>
          <li><router-link to="/AboutUs">About Us</router-link></li>
        </ul>
      </div>
      <div class="flex items-center justify-between gap-2 mr-48 relative">
        <div class="rounded-full gap-5 flex items-center justify-center cursor-pointer" @click="toggleProfileCard">
          <img :src="store.user.profilePicture" alt="Profile Picture" class="object-cover rounded-full h-12 w-12">
          <p class="text-xl font-medium text-white" :class="{'text-change': scrolled}">Halo, {{ store.user.name }}</p>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { store } from '../store';
import logo from '../assets/images/nearus.png';

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

.bg-white {
  background-color: white;
}

.text-change {
  color: black;
}

.shadow-lg {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
