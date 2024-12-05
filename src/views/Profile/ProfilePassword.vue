<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Navigation -->
    <NavFixed />

    <!-- Main Content -->
    <main class="flex flex-col items-center px-5 mt-12 flex-1">
      <section class="mt-16 w-full max-w-5xl">
        <div class="flex gap-5 md:flex-row flex-col">
          <!-- Sidebar -->
          <div class="w-full md:w-[344px]">
            <div class="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 class="font-bold text-lg mb-2">Account Settings</h2>
              <router-link to="/profile" class="sidebar-option">Change Profile</router-link>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h2 class="font-bold text-lg mb-2">Password & Security</h2>
              <router-link to="" class="sidebar-option">Change Password</router-link>
            </div>
          </div>

          <!-- Main Content -->
          <section class="flex flex-col w-full bg-blue-50 p-8 rounded-lg shadow-2xl">
            <!-- Reset Password Section -->
            <section class="mt-8">
              <h2 class="font-bold text-3xl mb-4 text-black">Reset Password</h2>
              <p class="text-sm text-black mb-6">Change your account password</p>
              <p class="text-sm text-black mb-6">Password dibutuhkan setidaknya 8 huruf, Karakter spesial "#" "!", dan Angka</p>
              <PasswordAlert v-if="showAlert" :message="alertMessage" :type="alertType" @close="showAlert = false" />

              <form class="space-y-6" @submit.prevent="updatePasswordProfile">
                <div>
                  <label class="block text-black font-semibold">Current Password</label>
                  <input
                      type="password"
                      class="w-full border-black rounded-lg mt-1 p-3 border focus:border-blue-500 focus:ring-blue-500 transition ease-in-out duration-150"
                      v-model="currentPassword"
                      required
                  />
                </div>
                <div>
                  <label class="block text-black font-semibold">New Password</label>
                  <input
                      type="password"
                      class="w-full border-black rounded-lg mt-1 p-3 border focus:border-blue-500 focus:ring-blue-500 transition ease-in-out duration-150"
                      v-model="newPassword"
                      required
                  />
                </div>
                <div>
                  <label class="block text-black font-semibold">Confirm New Password</label>
                  <input
                      type="password"
                      class="w-full border-black rounded-lg mt-1 p-3 border focus:border-blue-500 focus:ring-blue-500 transition ease-in-out duration-150"
                      v-model="confirmPassword"
                      required
                  />
                </div>
                <div class="relative">
                  <button
                      type="submit"
                      class="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-6 font-semibold transition-colors duration-300 hover:bg-blue-700 disabled:bg-blue-400"
                      :disabled="loading"
                  >
                    <span v-if="!loading">Reset Password</span>
                    <span v-else class="flex justify-center items-center">
                      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.657-5.657L19.657 6.343A8 8 0 004 12z"></path>
                      </svg>
                      <span class="ml-2">Loading...</span>
                    </span>
                  </button>
                  <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg"></div>
                </div>
              </form>
            </section>
          </section>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <Footer />
    <!-- ProfileCard Component -->
    <ProfileCard v-if="showProfileCard" />
  </div>
</template>


<script>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/Pages/NavFixed.vue';
import Footer from '@/components/Pages/Footer.vue';
import PasswordAlert from '@/components/Profile/PasswordAlert.vue';
import axios from 'axios';
import ProfileCard from "@/components/Profile/ProfileCard.vue";


export default {
  computed: {
    loadingModal() {
      return loadingModal
    }
  },
  components: {ProfileCard, NavFixed, Footer, PasswordAlert},
  setup() {
    const user = ref({email: ''});
    const store = useStore();
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const passwordError = ref('');
    const showProfileCard = ref(false);
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref('');
    const loading = ref(false);

    onMounted(async () => {
      try {
        await store.dispatch('fetchUserData');
        const userData = store.getters.getUser;
        if (userData) {
          user.value.email = userData.email || '';
        }
      } catch (error) {
        console.error('Failed to Fetch User Data');
      }

      // Adding event listener to toggle profile card
      window.addEventListener('toggle-profile-card', toggleProfileCard);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('toggle-profile-card', toggleProfileCard);
    });

    const toggleProfileCard = () => {
      showProfileCard.value = !showProfileCard.value;
    };

    const updatePasswordProfile = async () => {
      loading.value = true;

      try {
        if (newPassword.value !== confirmPassword.value) {
          passwordError.value = 'New password and confirmation do not match.';
          showAlert.value = true;
          alertMessage.value = passwordError.value;
          alertType.value = 'error';
          loading.value = false;
          return;
        }

        passwordError.value = ''; // Reset any previous error

        const token = store.state.token; // Get the user's token from the store

        const response = await axios.post('https://api.nearus.id/api/profile/reset-password', {
          email: user.value.email || '',
          current_password: currentPassword.value || '',
          new_password: newPassword.value || ''
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          showAlert.value = true;
          alertMessage.value = 'Password changed successfully';
          alertType.value = 'success';

          currentPassword.value = '';
          newPassword.value = '';
          confirmPassword.value = '';
        }

      } catch (error) {
        console.error('Failed to Update Password', error);

        if (error.response) {
          if (error.response.status === 404) {
            alertMessage.value = 'Email not found';
          } else if (error.response.status === 403) {
            alertMessage.value = 'Current password is incorrect';
          } else if (error.response.status === 400) {
            alertMessage.value = 'New password cannot be the same as the current password';
          } else {
            alertMessage.value = 'An error occurred while changing the password';
          }
          alertType.value = 'error';
          showAlert.value = true;
        } else {
          alertMessage.value = 'Failed to connect to the server. Please try again later.';
          alertType.value = 'error';
          showAlert.value = true;
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      passwordError,
      updatePasswordProfile,
      showAlert,
      alertMessage,
      showProfileCard,
      alertType,
    };
  }
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

.relative {
  position: relative;
}
</style>
