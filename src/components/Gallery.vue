<template>
  <div class="container ml-36 pt-32">
    <div class="grid grid-cols-5 w-auto">
      <div class="col-span-3 row-span-2">
        <img :src="images[0]" alt="Image 1" class="w-full h-[560px] object-cover rounded-lg shadow-lg">
      </div>
      <div class="col-span-2 flex flex-col gap-4 px-5">
        <div class="flex gap-4">
          <img :src="images[1]" alt="Image 2" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
          <img :src="images[2]" alt="Image 3" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
        </div>
        <div class="flex gap-4">
          <img :src="images[3]" alt="Image 4" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
          <img :src="images[4]" alt="Image 5" class="w-[330px] h-[270px] object-cover rounded-lg shadow-lg">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
  'https://via.placeholder.com/600x400',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
  'https://via.placeholder.com/300x200',
]);
</script>

<style lang="scss" scoped>
</style>
