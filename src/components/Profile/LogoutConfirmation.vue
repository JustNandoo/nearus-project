<template>
    <div v-if="show" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 class="text-lg font-bold mb-4">Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="cancel" class="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
          <button @click="confirmLogout" class="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      confirmLogout() {
        this.$emit('confirm');
      },
    },
  };
  </script>
  