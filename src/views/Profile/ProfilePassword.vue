<template>
  <div class="flex flex-col pb-14 bg-white min-h-screen">
    <NavFixed />
    <main class="flex flex-col items-center px-5 mt-12 w-full">
      <section class="mt-16 w-full max-w-5xl">
        <div class="flex gap-5 max-md:flex-col max-md:gap-5">
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

              <form class="space-y-4" @submit.prevent="updatePasswordProfile">
                <div>
                  <label class="block text-gray-700">Current Password</label>
                  <input type="password" class="w-full border-gray-300 rounded-lg mt-1 input-field" v-model="currentPassword" required>
                </div>
                <div>
                  <label class="block text-gray-700">New Password</label>
                  <input type="password" class="w-full border-gray-300 rounded-lg mt-1 input-field" v-model="newPassword" required>
                </div>
                <div>
                  <label class="block text-gray-700">Confirm New Password</label>
                  <input type="password" class="w-full border-gray-300 rounded-lg mt-1 input-field" v-model="confirmPassword" required>
                </div>
                <button type="submit" class="w-full bg-green-500 text-white px-4 py-2 rounded-lg mt-6 button">Reset Password</button>
              </form>
            </section>
          </section>
        </div>
      </section>
    </main>
  </div>
  <Footer/>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/Pages/NavFixed.vue';
import Footer from '@/components/Pages/Footer.vue';
import PasswordAlert from '@/components/Profile/PasswordAlert.vue';
import axios from 'axios';
import { API_URL } from '@/constants';

export default {
  components: {Footer, NavFixed, PasswordAlert },
  setup() {
    const user = ref({
      email: ''
    });
    const store = useStore();
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref('');
    const loading = ref(false);

    onMounted(async () => {
      try {
        await store.dispatch('fetchUserData');
        const userData = store.getters.getUser;
        if (userData) {
          user.value = {
            email: userData.email || '',
          };
        }
      } catch (error) {
        console.error('Failed to Fetch User Data');
      }
    });

    const updatePasswordProfile = async () => {
      loading.value = true;

      try {
        // Check if new password matches the confirmation password
        if (newPassword.value !== confirmPassword.value) {
          alertMessage.value = 'New password and confirmation do not match.';
          alertType.value = 'error';
          showAlert.value = true;
          loading.value = false;
          return;
        }

        const token = store.state.token; // Get the user's token from the store

        // Send the password update request
        const response = await axios.post(`${API_URL}/profile/reset-password`, {
          email: user.value.email || '',
          current_password: currentPassword.value || '',
          new_password: newPassword.value || ''
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Handle the response status
        if (response.status === 200) {
          alertMessage.value = 'Password changed successfully';
          alertType.value = 'success';
          showAlert.value = true;
        }

      } catch (error) {
        console.error('Failed to Update Password', error);

        // Handle specific error codes
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
          // Handle other errors, such as network issues
          alertMessage.value = 'Failed to connect to the server. Please try again later.';
          alertType.value = 'error';
          showAlert.value = true;
        }
      } finally {
        loading.value = false; // Ensure loading is set to false after the operation
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      updatePasswordProfile,
      showAlert,
      alertMessage,
      alertType,
    };
  }
}
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
