<template>
  <div class="h-screen w-[350px] w-min-[350px] border-r-[1px] text-white shadow-lg flex flex-col justify-between">
    <div>
      <div class="p-4 text-2xl font-bold border-b-[0.5px]">
        <img class="w-[120px] h-auto" :src="logo" alt="">
      </div>
      <p class="text-neutral-500 ml-5 mt-4 text-[16px]">Main Menu</p>
      <div class="flex flex-col gap-4 mt-3">
        <router-link
            v-for="item in mainMenuItems"
            :key="item.text"
            :to="item.path"
            class="flex gap-1 items-center rounded-lg mx-4 py-2 cursor-pointer transition"
            :class="[
            'text-neutral-500 font-medium hover:bg-[#E0E0E0] hover:text-black',
            { 'bg-[#F6F6F6] text-black font-bold': isActive(item.path) }
          ]"
            exact
        >
          <FontAwesomeIcon :class="{ 'text-black': isActive(item.path), 'text-neutral-500': !isActive(item.path) }" class="w-5 h-5 ml-4" :icon="item.icon"/>
          <p class="px-4 py-2">{{ item.text }}</p>
        </router-link>
      </div>
      <p class="text-neutral-500 ml-5 mt-4 text-[16px]">General</p>
      <div class="flex flex-col gap-4 mt-3">
        <router-link
            v-for="item in generalItems"
            :key="item.text"
            :to="item.path"
            class="flex gap-1 items-center rounded-lg mx-4 py-2 cursor-pointer transition"
            :class="[
            'text-neutral-500 font-medium hover:bg-[#E0E0E0] hover:text-black',
            { 'bg-[#F6F6F6] text-black font-bold': isActive(item.path) }
          ]"
            exact
        >
          <FontAwesomeIcon :class="{ 'text-black': isActive(item.path), 'text-neutral-500': !isActive(item.path) }" class="w-5 h-5 ml-4" :icon="item.icon"/>
          <p class="px-4 py-2">{{ item.text }}</p>
        </router-link>
      </div>
    </div>
    <div class="mb-4">
      <div
          @click="setActive('Logout')"
          :class="[
          'flex gap-1 items-center rounded-lg mx-4 py-2 cursor-pointer transition',
          activeItem === 'Logout' ? 'bg-[#F6F6F6] text-black font-bold' : 'text-neutral-500 font-medium hover:bg-[#E0E0E0] hover:text-black'
        ]"
      >
        <FontAwesomeIcon :class="activeItem === 'Logout' ? 'text-black' : 'text-neutral-500'" class="w-5 h-5 ml-4" :icon="faDoorOpen"/>
        <p class="px-4 py-2">Logout</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import logo from '../assets/images/nearus.png';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faDoorOpen, faGear, faUser, faDatabase, faChartLine, faHouseUser } from '@fortawesome/free-solid-svg-icons';

const activeItem = ref('Dashboard');
const setActive = (item) => {
  activeItem.value = item;
};

const mainMenuItems = [
  { text: 'Dashboard', icon: faHouse, path: '/dashboard-dashboard' },
  { text: 'Data', icon: faDatabase, path: '/dashboard-data' },
  { text: 'Statistic', icon: faChartLine, path: '/dashboard-statistic' },
  { text: 'KosKu', icon: faHouseUser, path: '/kosku' },
];

const generalItems = [
  { text: 'Settings', icon: faGear, path: '/settings' },
  { text: 'Profile', icon: faUser, path: '/profile' },
];

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

<style lang="scss" scoped>
</style>
