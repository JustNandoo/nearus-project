<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded shadow-md max-w-md w-full">
        <h2 class="text-lg font-bold mb-2">{{ title }}</h2>
        <p class="mb-4">{{ message }}</p>
        <button @click="closeAlert" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">OK</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Alert',
      },
      message: {
        type: String,
        default: '',
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      closeAlert() {
        this.$emit('close');
      },
    },
  };
  </script>
  