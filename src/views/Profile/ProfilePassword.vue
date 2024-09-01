  <template>
    <div class="flex flex-col pb-14 bg-gray-100 min-h-screen">
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
                <router-link to="/passworddata/:id" class="sidebar-option">Change Password</router-link>
              </div>
            </div>
            <!-- Main Content -->
            <section class="flex flex-col w-full bg-white p-8 rounded-lg shadow-lg">
              <!-- Reset Password Section -->
              <section class="mt-4">
                <h2 class="font-bold text-3xl mb-4">Reset Password</h2>
                <p class="text-md text-gray-600 mb-8">Change your account password to enhance security.</p>
                <PasswordAlert v-if="showAlert" :message="alertMessage" :type="alertType" @close="showAlert = false"/>

                <form class="space-y-6" @submit.prevent="updatePasswordProfile">
                  <div>
                    <label class="block text-gray-700 text-sm font-semibold">Current Password</label>
                    <input type="password" class="w-full border  border-black rounded-lg mt-1 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out" v-model="currentPassword" required>
                  </div>
                  <div>
                    <label class="block text-gray-700 text-sm font-semibold">New Password</label>
                    <input type="password" class="w-full border border-black rounded-lg mt-1 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out" v-model="newPassword" required>
                  </div>
                  <div>
                    <label class="block text-gray-700 text-sm font-semibold">Confirm New Password</label>
                    <input type="password" class="w-full border  border-black rounded-lg mt-1 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out" v-model="confirmPassword" required>
                  </div>
                  <button type="submit" class="w-full bg-blue-500 text-white px-4 py-3 rounded-lg mt-6 transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Reset Password</button>
                </form>
              </section>
            </section>
          </div>
        </section>
      </main>
      <Footer />
      <ProfileCard v-if="showProfileCard" />

      <!-- Loading Spinner -->
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
        <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  </template>
  <script>
  import {onBeforeUnmount, onMounted, ref} from 'vue';
  import { useStore } from 'vuex';
  import NavFixed from '@/components/Pages/NavFixed.vue';
  import Footer from '@/components/Pages/Footer.vue';
  import PasswordAlert from '@/components/Profile/PasswordAlert.vue';
  import axios from 'axios';
  import { API_URL } from '@/constants';
  import ProfileCard from "@/components/Profile/ProfileCard.vue";

  export default {
    components: {
      ProfileCard,
      NavFixed,
      Footer,
      PasswordAlert,
    },
    setup() {
      const store = useStore();
      const currentPassword = ref('');
      const newPassword = ref('');
      const confirmPassword = ref('');
      const passwordError = ref('');
      const showAlert = ref(false);
      const alertMessage = ref('');
      const alertType = ref('');
      const loading = ref(false);
      const user = ref({ email: '' });
      const showProfileCard = ref(false);

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
      });
      const toggleProfileCard = () => {
        showProfileCard.value = !showProfileCard.value;
      };

      onMounted(() => {
        window.addEventListener('toggle-profile-card', toggleProfileCard);
      });

      onBeforeUnmount(() => {
        window.removeEventListener('toggle-profile-card', toggleProfileCard);
      });

      const updatePasswordProfile = async () => {
        loading.value = true;
        try {
          if (newPassword.value !== confirmPassword.value) {
            passwordError.value = 'New password and confirmation do not match.';
            showAlert.value = true;
            alertMessage.value = passwordError.value;
            alertType.value = 'error';
            return;
          }

          passwordError.value = ''; // Reset any previous error
          const token = store.state.token;

          const response = await axios.post(`${API_URL}/profile/reset-password`, {
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
          } else {
            alertMessage.value = 'Failed to connect to the server. Please try again later.';
            alertType.value = 'error';
          }
          showAlert.value = true;
        } finally {
          loading.value = false; // Ensure loading is set to false after the operation
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
        loading
      };
    }
  };
  </script>
  <style scoped>

  .button {
    background-color: #3182ce;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #2b6cb0;
  }

  .input-field {
    padding: 0.75rem;
    border: 1px solid #bee3f8;
    border-radius: 0.375rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .input-field:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 1px rgba(99, 172, 237, 0.5);
  }
  </style>
