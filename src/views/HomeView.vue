// HomeView.vue
<template>
  <div class="bg-white p-0 m-0 relative">
    <Nav />
    <CarouselHome />
    <div class="main ml-20 mt-20">
      <h1 class="font-extrabold text-3xl">Kos Terpopuler</h1>
      <div class="grid grid-cols-4 gap-4">
        <ProductCard v-for="index in 8" :key="index" />
      </div>
      <div class="flex justify-center mt-10 mb-20">
        <button class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[250px] rounded-lg text-white text-[22px] font-medium shadow-lg">
          Lihat Semua
        </button>
      </div>
      <h1 class="font-extrabold text-3xl">Cari Kos Sesuai Budgetmu</h1>
      <PriceSortCard />
      <div class="grid grid-cols-4 gap-4">
        <ProductCard v-for="index in 8" :key="index" />
      </div>
      <div class="flex justify-center mt-10 mb-20">
        <button class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[250px] rounded-lg text-white text-[22px] font-medium shadow-lg">
          Lihat Semua
        </button>
      </div>
    </div>
    <ProfileCard v-if="showProfileCard" class="profile-card"/>
    <FooterComponent/>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Nav from "@/components/Nav.vue";
import CarouselHome from "@/components/CarouselHome.vue";
import ProductCard from "@/components/ProductCard.vue";
import PriceSortCard from "@/components/PriceSortCard.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import FooterComponent from "@/components/Footer.vue";

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

<style>
.bg-white {
  background-color: white;
}

.main {
  margin-left: 5rem;
  margin-right: 1.25rem;
  margin-top: 5rem;
}

.bg-blue-primary {
  background-color: #007bff; 
}

.profile-card {
  position: absolute;
  top: 5rem; 
  right: 2rem; 
  z-index: 1100;
}
</style>
