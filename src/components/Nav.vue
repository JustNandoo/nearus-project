<template>
  <header class="header font-montserrat fixed w-full bg-transparent h-20 pt-3 pb-3 items-center z-[1000]"
          :class="{'bg-white': data.scrolled, 'shadow-lg' : data.scrolled}">
    <nav class="flex justify-between items-center w-[92%] mx-auto mr-32">
      <div class="ml-60">
        <img class="w-32" :src=data.logo alt="logo">
      </div>
      <div class="mr-96">
        <ul class="flex items-center gap-10 text-xl font-medium text-white" :class="{'text-change':data.scrolled}">
          <li>
            <a class="" href="#">Sewa</a>
          </li>
          <li>
            <a class="" href="#">NearusFinance</a>
          </li>
          <li>
            <a class="" href="#">About Us</a>
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-between gap-2 mr-48">
        <div class="rounded-full h-12 w-12 flex items-center justify-center">
          <img :src=data.profilepicture alt="Profile Picture" class="rounded-full h-10 w-10">
        </div>
        <p class="text-xl font-medium text-white" :class="{'text-change':data.scrolled}">Halo, Calvin Aprilio Hariyanto</p>
      </div>
    </nav>
  </header>
</template>

<script setup>


import {onBeforeMount, onMounted, reactive} from "vue";

const data = reactive({
  scrolled: false,
  logo: '../src/assets/images/nearus.png',
  profilepicture: '../src/assets/images/tesimg1.jpeg',
})



const handleScroll = () => {
  data.scrolled = window.scrollY > 0;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

onBeforeMount(() => {
  window.removeEventListener('scroll', handleScroll);
})


</script>

<style>
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