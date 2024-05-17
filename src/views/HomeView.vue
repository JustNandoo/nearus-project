<template>
  <div class="bg-white p-0 m-0">
    <Nav />
    <CarouselHome />
    <div class="main ml-20 mr-5 mt-20">
      <h1 class="font-extrabold text-3xl">Kos Terpopuler</h1>
      <div class="grid grid-cols-4 gap-20">
        <ProductCard v-for="index in 4" :key="index" />
      </div>
      <div class="flex justify-center mt-20 mb-20">
        <button class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[200px] rounded-lg text-white text-[22px] font-medium shadow-lg">
          Lihat Semua
        </button>
      </div>
      <h1 class="font-extrabold text-3xl">Cari Kos Sesuai Budgetmu</h1>
      <PriceSortCard />
      <div class="grid grid-cols-4 gap-4">
        <ProductCard v-for="index in 8" :key="index" />
      </div>
      <div class="flex justify-center mt-20 mb-20">
        <button class="bg-blue-primary flex items-center px-2 py-3 justify-center gap-5 w-[200px] rounded-lg text-white text-[22px] font-medium shadow-lg">
          Lihat Semua
        </button>
      </div>>
    </div>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import CarouselHome from "@/components/CarouselHome.vue";
import ProductCard from "@/components/ProductCard.vue";
import PriceSortCard from "@/components/PriceSortCard.vue";
</script>
