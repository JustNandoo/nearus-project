<template>
  <header class="header bg-white font-montserrat fixed top-0 w-screen h-[200px] pt-3 pb-3 items-center z-[1000]"
          :class="{'bg-blue-primary': scrolled, 'shadow-lg': scrolled}">
    <nav class="flex flex-col items-center justify-between w-full px-8 h-full">
      <div class="flex justify-between items-center w-full">
        <router-link to="/home">
          <img class="w-32" :src="scrolled ? scrolledLogo : logo" alt="logo">
        </router-link>
        <div class="flex items-center gap-10 text-xl font-medium text-black" :class="{'text-change': scrolled}">
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
            <p class="text-xl font-medium text-black" :class="{'text-change': scrolled}">
              Halo, {{ userName }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center mb-5">
        <SearchBar />
      </div>
    </nav>
  </header>
</template>



<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import logo from '../../assets/images/nearus.png';
import scrolledLogo from '../../assets/images/nearuswhite.png';
import imageProfileDefault from '@/assets/images/profile-pic.png';
import SearchBar from "@/components/Home/SearchBar.vue";

const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const user = computed(() => store.getters.getUser);
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const toggleProfileCard = () => {
  const event = new Event('toggle-profile-card');
  window.dispatchEvent(event);
};

const profilePicture = computed(() => user.value.photoprofile || imageProfileDefault);
const userName = computed(() => user.value.name || 'Guest');

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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Default shadow */
}

.bg-blue-primary {
  background-color: #008DDA;
}

.text-change {
  color: white;
}

/* Box shadow when scrolled */
.bg-blue-primary.shadow-lg {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Media query adjustments */
@media (max-width: 768px) {
  .header nav {
    padding: 0 20px;
  }

  .header .gap-10 {
    display: none;
  }
}

.rounded-button {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.login-button {
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
}

.login-button:hover {
  background-color: #2779bd;
}

.register-button {
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
}

.register-button:hover {
  border-color: #ffffff;
  color: #3490dc;
}
</style>
