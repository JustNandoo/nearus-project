<template>
<header class="header font-montserrat sticky top-0 z-50 h-20 pt-3 pb-3 items-center" :class="{'bg-white': scrolled, 'shadow-lg' : scrolled}">
  <nav class="flex justify-between items-center w-[92%] mx-auto">
    <div class="ml-64">
      <img class="w-32" :src=logo alt="logo">
    </div>
    <div class="mr-96">
      <ul class="flex items-center gap-10 text-xl font-medium text-white" :class="{'text-change':scrolled}">
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
        <img :src=profilepicture alt="Profile Picture" class="rounded-full h-12 w-12">
      </div>
      <p class="text-xl font-medium text-white" :class="{'text-change':scrolled}">Halo, Calvin Aprilio Hariyanto</p>
    </div>
  </nav>
</header>
</template>

<script>
export default {
  data() {
    return {
      scrolled: false,
      logo: '../src/assets/images/nearus.png',
      profilepicture: '../src/assets/images/tesimg1.jpeg',
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
  },
}
</script>

<style>
.header {
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, margin-top 0.3s ease;
}

.bg-white {
  background-color: white;
}

.text-change{
  color: black;
}

.shadow-lg {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}


</style>