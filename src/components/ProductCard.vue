<template>
  <div class="mt-10 product-card h-full w-[400px]">
    <img class="w-full h-[220px] rounded-lg object-cover" :src="data.productimg" alt="">
    <div class="flex mt-4 gap-4 text-[20px] items-center">
      <font-awesome-icon class="text-black w-6 h-6 " :icon="faChild" />
      <p class="font-normal text-[16px]">Kost Pria</p>
    </div>
    <div class="mt-3">
      <h1 class="font-bold text-[20px]">Berong-Kost 2 Kudus</h1>
    </div>
    <div class="mt-3">
      <h1 class="font-normal text-[15px]">Gebog,Kudus,Jawa Tengah</h1>
    </div>
    <div class="mt-3">
      <h1 class="font-normal text-[15px]">Mulai dari <span class="font-bold">Rp.1.300.000</span>/Bulan</h1>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faChild} from '@fortawesome/free-solid-svg-icons';
import {reactive} from "vue";

const data = reactive({
  productimg:'../src/assets/images/carouseltesimg2.png'
})

const icon = {
  FontAwesomeIcon
}

</script>

