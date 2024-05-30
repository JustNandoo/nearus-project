<template>
  <div>
    <NavFixed/>
    <ProfileCard v-if="showProfileCard" class="profile-card"/>
    <Gallery/>
    <div class="ml-36 mr-36 mt-5 flex justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-3">
          <font-awesome-icon class="text-light-black w-5 h-5" :icon="faMedal"/>
          <p class="font-light text-[17px]">Rekomendasi</p>
        </div>
        <div class="flex flex-col gap-1">
          <h1 class="uppercase font-bold text-[35px]">berong kost 2</h1>
          <p class='text-black font-light text-[17px]'>Besito,Kudus</p>
          <div class="flex items-center gap-2">
            <font-awesome-icon class="text-light-black w-5 h-5" :icon="faPerson"/>
            <p class="text-black font-light text-[15px]">Kost Pria</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-96 text-end">
        <div class="flex flex-col gap-2">
          <h1 class="font-bold text-[24px]">Mulai Dari</h1>
          <h1 class="font-bold text-[24px]">Rp7.200.000 / 6 bulan</h1>
        </div>
        <div class="flex gap-2 items-center w-full justify-between">
          <button class="rounded-lg border-black border-2 w-20 h-12">
            <font-awesome-icon class="text-light-black w-6 h-6" :icon="faMessage"/>
          </button>
          <button class="bg-blue-primary w-full h-12 rounded-lg shadow-lg">
            <a class="no-underline text-white font-medium" href="">Lihat Kamar</a>
          </button>
        </div>
      </div>
    </div>
    <hr class="my-10 ml-32 mr-32 border-t-4 border-neutral-300 mb-10">
    <div class="mt-10 mr-32 ml-32 mb-20">
      <h1 class="font-bold text-[28px]">Fasilitas Bersama</h1>
      <div class="flex items-center gap-5">
        <div class="flex items-center">
          <img :src="" alt="">
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { faMedal, faPerson, faMessage } from "@fortawesome/free-solid-svg-icons";
import NavFixed from "@/components/NavFixed.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import ProfileCard from "@/components/ProfileCard.vue";
import Gallery from "@/components/Gallery.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const showProfileCard = ref(false);

const toggleProfileCard = () => {
  showProfileCard.value = !showProfileCard.value;
};

onMounted(() => {
  window.addEventListener('toggle-profile-card', toggleProfileCard);
});

onBeforeUnmount(() => {
  window.removeEventListener('toggle-profile-card', toggleProfileCard);
});
</script>

<style lang="scss" scoped>
</style>
