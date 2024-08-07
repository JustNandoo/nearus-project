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
              <p class="text-sm text-gray-600">Details about your Personal Information</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h2 class="font-bold text-lg mb-2">Password & Security</h2>
              <router-link to="/change-password" class="sidebar-option">Change Password</router-link>
              <p class="text-sm text-gray-600">Change your account password</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md mt-4">
              <router-link to="/login" class="sidebar-option">Logout</router-link>
            </div>
          </div>
          <!-- Main Content -->
          <section class="flex flex-col w-full bg-white p-6 rounded-lg shadow-md">
            <h2 class="font-bold text-2xl mb-4">Ubah Kata Sandi</h2>
            <form class="space-y-4" @submit.prevent="changePassword">
              <div>
                <label class="block text-gray-700">Kata Sandi Saat Ini</label>
                <input type="password" class="w-full border-gray-300 rounded-lg mt-1 input-field" v-model="currentPassword">
              </div>
              <div>
                <label class="block text-gray-700">Kata Sandi Baru</label>
                <input type="password" class="w-full border-gray-300 rounded-lg mt-1 input-field" v-model="newPassword">
              </div>
              <div>
                <label class="block text-gray-700">Ulangi Kata Sandi Baru</label>
                <input type="password" class="w-full border-gray-300 rounded-lg mt-1 input-field" v-model="confirmPassword">
              </div>
              <div class="mt-4">
                <p class="text-gray-600 text-sm">Minimal menggunakan 1 huruf kapital, 8 karakter, dan 1 simbol atau angka.</p>
              </div>
              <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 button">Simpan</button>
            </form>
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
import NavFixed from '@/components/NavFixed.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NavFixed,
    Footer,
  },
  setup() {
    const store = useStore();
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');

    const changePassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        alert('Kata sandi baru dan konfirmasi kata sandi tidak cocok.');
        return;
      }

      try {
        const response = await fetch('https://api.nearus.id/api/reset-password', {
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
          throw new Error('Failed to change password');
        }

        alert('Kata sandi berhasil diubah');
      } catch (error) {
        console.error('Error changing password:', error);
        alert('Terjadi kesalahan saat mengubah kata sandi');
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      changePassword,
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
