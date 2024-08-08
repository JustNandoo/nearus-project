<template>
  <div class="flex h-full w-screen">
    <sidebar />
    <div class="flex-1 flex flex-col p-8 bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Profile</h2>
        <div class="flex gap-8">
          <div class="w-1/4">
            <img src="https://via.placeholder.com/150" alt="Profile Picture" class="w-full h-auto rounded-full mb-4">
            <button class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Upload New Picture</button>
          </div>
          <div class="flex-1">
            <div class="mb-4">
              <label class="block text-gray-700">Name</label>
              <input type="text" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" value="John Doe">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Email</label>
              <input type="email" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" value="john.doe@example.com">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Phone</label>
              <input type="tel" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" value="123-456-7890">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Address</label>
              <input type="text" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200" value="123 Main St, Springfield, USA">
            </div>
            <button class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
