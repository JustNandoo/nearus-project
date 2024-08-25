<template>
  <div class="flex h-screen w-screen">
    <sidebar />
    <div class="flex-1 flex flex-col pb-14">
      <main class="flex flex-col items-center px-5 mt-12 w-full">
        <section class="mt-16 w-full max-w-5xl">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-6">Settings</h1>
            <section class="flex flex-col w-full bg-white p-6 rounded-lg shadow-md">
              <section class="mt-12">
                <h2 class="font-bold text-2xl mb-4">Reset Password</h2>
                <p class="text-sm text-gray-600">Change your account password</p>
                <PasswordAlert v-if="showAlert" :message="alertMessage" :type="alertType" @close="showAlert = false"/>
                <form class="space-y-4" @submit.prevent="resetPassword">
                  <div>
                    <label class="block text-gray-700">Email</label>
                    <input type="email" class="w-full border-gray-300 rounded-lg mt-1 input-field" v-model="email">
                    <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
                  </div>
                  <button type="submit" class="w-full bg-green-500 text-white px-4 py-2 rounded-lg mt-6 button">Reset Password</button>
                </form>
              </section>
            </section>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import PasswordAlert from '@/components/Profile/PasswordAlert.vue'; // Import PasswordAlert component
import axios from 'axios';
import { API_URL } from '@/constants';

const store = useStore();
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const email = ref('');
const emailError = ref('');
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');

// Change Password Function
const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    showAlert.value = true;
    alertMessage.value = 'Kata sandi baru dan konfirmasi kata sandi tidak cocok.';
    alertType.value = 'error';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/profile/reset-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${store.state.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Gagal mengubah kata sandi');
    }

    showAlert.value = true;
    alertMessage.value = 'Kata sandi berhasil diubah';
    alertType.value = 'success';
  } catch (error) {
    console.error('Error changing password:', error);
    showAlert.value = true;
    alertMessage.value = 'Terjadi kesalahan saat mengubah kata sandi';
    alertType.value = 'error';
  }
};

// Reset Password Function
const resetPassword = async () => {
  if (!email.value) {
    emailError.value = 'Email harus diisi'; 
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Format email tidak valid'; 
    return;
  }
  
  emailError.value = '';

  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email: email.value });
    showAlert.value = true;
    alertMessage.value = response.data.message;
    alertType.value = 'success';
  } catch (error) {
    showAlert.value = true;
    alertMessage.value = error.response.data.message || 'Terjadi kesalahan saat mereset kata sandi';
    alertType.value = 'error';
  }
};
</script>

<style scoped>
.input-field {
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.input-field:focus {
  border-color: #2563eb;
  outline: none;
}

.button {
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2563eb;
}
</style>
