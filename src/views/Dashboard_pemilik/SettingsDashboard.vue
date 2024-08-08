<template>
<div class="flex">
  <sidebar/>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Settings</h1>
    <div class="space-y-6">
      <section class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Change Account</h2>
        <form @submit.prevent="handleAccountChange">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" v-model="account.username" class="mt-1 p-2 w-full border rounded-md">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" v-model="account.email" class="mt-1 p-2 w-full border rounded-md">
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Save Changes</button>
        </form>
      </section>

      <section class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Change Password</h2>
        <form @submit.prevent="handleChangePassword">
          <div class="mb-4">
            <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" id="currentPassword" v-model="passwords.current" class="mt-1 p-2 w-full border rounded-md">
          </div>
          <div class="mb-4">
            <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" id="newPassword" v-model="passwords.new" class="mt-1 p-2 w-full border rounded-md">
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="passwords.confirm" class="mt-1 p-2 w-full border rounded-md">
          </div>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Change Password</button>
        </form>
      </section>

      <section class="p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Other Settings</h2>
        <!-- Add other settings here -->
        <p class="text-gray-600">This section can be used for other common dashboard settings.</p>
      </section>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";

const account = ref({
  username: '',
  email: ''
});

const passwords = ref({
  current: '',
  new: '',
  confirm: ''
});

const handleAccountChange = () => {
  // Handle account change logic here
  console.log('Account changed:', account.value);
};

const handleChangePassword = () => {
  if (passwords.value.new === passwords.value.confirm) {
    // Handle password change logic here
    console.log('Password changed:', passwords.value);
  } else {
    console.log('Passwords do not match');
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
