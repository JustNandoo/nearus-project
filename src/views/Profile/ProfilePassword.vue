<template>
  <div class="flex flex-col pb-14 bg-gray-100 min-h-screen">
    <NavFixed />
    <main class="flex flex-col items-center px-5 mt-12 w-full">
      <section class="mt-16 w-full max-w-5xl">
        <div class="flex gap-5 max-md:flex-col max-md:gap-5">
          <!-- Sidebar -->
          <div class="w-full md:w-[344px]">
            <div class="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 class="font-bold text-lg mb-2">Account Setting</h2>
              <router-link to="/profile" class="sidebar-option">Change Profile</router-link>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h2 class="font-bold text-lg mb-2">Password & Security</h2>
              <router-link to="/change-password" class="sidebar-option">Change Password</router-link>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md mt-4">
              <router-link to="/login" class="sidebar-option">Logout</router-link>
            </div>
          </div>
          <!-- Main Content -->
          <section class="flex flex-col w-full bg-white p-6 rounded-lg shadow-md">
            <!-- Reset Password Section -->
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
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/Pages/NavFixed.vue';
import Footer from '@/components/Pages/Footer.vue';
import PasswordAlert from '@/components/Profile/PasswordAlert.vue'; // Import PasswordAlert component
import axios from 'axios';
import { API_URL } from '@/constants';

export default {
  components: {
    NavFixed,
    Footer,
    PasswordAlert, // Register PasswordAlert component
  },
  setup() {
    const store = useStore();
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const email = ref('');
    const emailError = ref('');
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref('');

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

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      email,
      emailError,
      changePassword,
      resetPassword,
      showAlert,
      alertMessage,
      alertType,
    };
  },
};
</script>

<style scoped>
.label-field {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.input-field {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}

.button {
  background-color: #008DDA;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0072b1;
}
</style>
