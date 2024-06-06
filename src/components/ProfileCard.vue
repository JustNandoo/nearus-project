<template>
  <transition name="slide-appear">
    <div v-if="isVisible" class="profile-card bg-white rounded-lg shadow-lg w-[450px] h-[670px] px-5 z-[10000]">
      <div class="flex items-start justify-between border-b-[1px] border-black pb-4">
        <div class="mt-8         ml-8px text-left">
          <h1 class="mb-4 font-bold text-[23px]" id="nama">{{ user.name }}</h1>
          <p>{{ user.email }}</p>
        </div>
        <img class="mt-5 ml-1 w-[100px] h-[100px] object-cover rounded-full" :src="profilePicture" alt="Profile Picture">
      </div>
      <div>
        <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black">
          <font-awesome-icon class="text-black w-8 h-8" :icon="faHouseUser" />
          <p class="text-[22px] font-medium">Kosku</p>
        </div>
        <router-link to="/profile">
          <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black mb-7">
            <font-awesome-icon class="text-black w-8 h-8" :icon="faGear" />
            <p class="text-[22px] font-medium">Pengaturan</p>
          </div>
        </router-link>
        <div class="w-full bg-gray-100 h-[10px]"></div>
        <div class="mt-5 ml-2">
          <h1 class="font-bold text-[22px]">Pusat Bantuan</h1>
        </div>
        <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black">
          <font-awesome-icon class="text-black w-8 h-8" :icon="faHeadset" />
          <p class="text-[22px] font-medium">Customer Service</p>
        </div>
        <router-link to="/PrivacyPolicy">
        <div class="flex gap-7 py-6 items-center px-10 border-b-[1px] border-black">
          <font-awesome-icon class="text-black w-8 h-8" :icon="faCircleQuestion" />
          <p class="text-[22px] font-medium">Syarat dan Ketentuan</p>
        </div>
      </router-link>
        <button @click="logout" class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-full rounded-lg mt-7 text-white text-[22px] font-medium">
          <font-awesome-icon :icon="faRightFromBracket" class="text-white w-8 h-8"/>
          Keluar
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { faHouseUser, faGear, faHeadset, faCircleQuestion, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import profilePicture from '../assets/images/tesimg1.jpeg';
import { useStore } from 'vuex';

const isVisible = ref(false);
const router = useRouter();
const store = useStore();

const user = computed(() => {
  const userData = store.getters.getUser;
  console.log('User data in ProfileCard:', userData); 
  return userData;
});

const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};

setTimeout(() => {
  isVisible.value = true;
}, 100);
</script>


<style scoped>
.profile-card {
  position: fixed;
  top: 6rem;
  right: 15rem;
  z-index: 1100;
}

.slide-appear-enter-active {
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
