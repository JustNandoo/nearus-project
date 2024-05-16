<template>
  <div class="mt-6 product-card h-[900px] w-[500px]">
    <img class="w-full h-[220px] rounded-lg" :src="data.productimg" alt="">
    <div class="flex mt-4 gap-4 text-[20px] items-center">
      <font-awesome-icon class="text-black w-6 h-6 " :icon="faChild" />
      <p class="font-normal text-2xl">Kost Pria</p>
    </div>
    <div class="mt-3">
      <h1 class="font-bold text-3xl">Berong-Kost 2 Kudus</h1>
    </div>
    <div class="mt-3">
      <h1 class="font-normal text-2xl">Gebog,Kudus,Jawa Tengah</h1>
    </div>
    <div class="mt-3">
      <h1 class="font-normal text-2xl">Mulai dari <span class="font-bold">Rp.1.300.000</span>/Bulan</h1>
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

