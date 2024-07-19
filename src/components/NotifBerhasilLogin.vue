<template>
  <div id="toast-bottom-right" class="fixed flex items-center justify-end w-full max-w-sm p-4 space-x-4 divide-x rtl:divide-x-reverse right-5 bottom-5 space-x" role="alert">
    <div class="flex items-center p-4 mb-4 text-base text-white rounded-lg bg-red-50 bg-blue-primary dark:text-blue-400 shadow-lg transition duration-300 ease-in-out transform hover:scale-105" role="alert">
      <svg class="flex-shrink-0 inline w-5 h-5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span class="sr-only">Info</span>
      <div class="flex-grow truncate">
        <span class="font-semibold text-lg">Login Berhasil !</span> Selamat datang kembali
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
