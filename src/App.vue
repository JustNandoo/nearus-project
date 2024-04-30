<template>
  <div class="full-screen-bg font-sans">
    <RouterView />
    <LoginView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import LoginView from './views/LoginView.vue';
</script>

<style lang="scss" scoped>
.full-screen-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; 
  background: url('@/assets/images/bg-loginPage.png') center/cover no-repeat; 
}
</style>
