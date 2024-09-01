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
              <router-link to="/passworddata/:id" class="sidebar-option">Change Password</router-link>
            </div>
          </div>
          <!-- Main Content -->
          <section class="flex flex-col w-full">
            <div class="flex items-center mb-6">
              <div class="relative">
                <!-- Display preview image if available, else display the user's profile picture -->
                <img id="profile-pic" loading="lazy" :src="profilePicPreview || user.photoprofile" alt="Profile Picture" class="w-20 h-20 rounded-full object-cover shadow-md">
                <label for="upload-profile-pic" class="absolute bottom-2 right-2 bg-sky-600 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center transition duration-300 hover:bg-sky-700 shadow-md">
                  <i class="fas fa-pencil-alt text-white"></i>
                  <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="handleFileChange">
                </label>
              </div>
              <div class="ml-4">
                <h2 class="font-bold text-lg">Upload a New Photo</h2>
                <p class="text-gray-600">Profile-pic.jpg</p>
              </div>
            </div>
            <h2 class="font-bold text-2xl mb-4">Update User Information</h2>
            <p class="text-sm text-gray-600">Details about your Personal Information</p>
            <form class="space-y-4" @submit.prevent="updateUserData">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700">Full Name</label>
                  <input type="text" class="input-field" v-model="user.name">
                </div>
                <div>
                  <label class="block text-gray-700">Email Address</label>
                  <input type="email" class="input-field" v-model="user.email">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700">Phone Number</label>
                  <input type="text" class="input-field" v-model="user.phonenumber">
                </div>
                <div>
                  <label class="block text-gray-700">Gender</label>
                  <select class="input-field" v-model="user.jenis_kelamin">
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="button" :disabled="loading">{{ loading ? 'Updating...' : 'Update Profile' }}</button>
            </form>
          </section>
        </div>
      </section>
    </main>

    <!-- Custom Alert Modal -->
    <LogoutConfirmation
        :show="showLogoutConfirmation"
        @confirm="logout"
        @cancel="showLogoutConfirmation = false"
    />

    <!-- Custom Alert Modal -->
    <div v-if="showAlert" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p>{{ alertMessage }}</p>
        <button @click="closeAlert" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">OK</button>
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
    <Footer />
    <ProfileCard v-if="showProfileCard" />
  </div>
</template>



<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/Pages/NavFixed.vue';
import LogoutConfirmation from '@/components/Profile/LogoutConfirmation.vue';
import Footer from '@/components/Pages/Footer.vue';
import ProfileCard from "@/components/Profile/ProfileCard.vue";

export default {
  components: { ProfileCard, NavFixed, Footer, LogoutConfirmation },
  setup() {
    const store = useStore();
    const user = ref({
      name: '',
      email: '',
      phonenumber: '',
      jenis_kelamin: '',
      photoprofile: '',
    });
    const selectedProfilePic = ref(null);
    const profilePicPreview = ref(null);
    const showAlert = ref(false);
    const alertMessage = ref('');
    const loading = ref(false);
    const showLogoutConfirmation = ref(false);
    const showProfileCard = ref(false);  // Declare showProfileCard

    onMounted(async () => {
      try {
        await store.dispatch('fetchUserData');
        const userData = store.getters.getUser;
        if (userData) {
          user.value = {
            name: userData.name || '',
            email: userData.email || '',
            phonenumber: userData.phonenumber || '',
            jenis_kelamin: userData.jenis_kelamin || '',
            photoprofile: userData.photoprofile || '',
          };
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
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

    const updateUserData = async () => {
      loading.value = true;
      try {
        const contactInfo = {
          name: user.value.name || null,
          email: user.value.email || null,
          phonenumber: user.value.phonenumber || null,
          jenis_kelamin: user.value.jenis_kelamin || null,
        };

        if (contactInfo.jenis_kelamin) {
          await store.dispatch('updateUserProfile', { jenis_kelamin: contactInfo.jenis_kelamin });
        }

        if (Object.values(contactInfo).some(value => value !== null)) {
          await store.dispatch('updateUserContactInfo', contactInfo);
        }

        if (selectedProfilePic.value) {
          const formData = new FormData();
          formData.append('photoprofile', selectedProfilePic.value);
          await store.dispatch('updateUserProfilePic', formData);
        }

        alertMessage.value = 'Profile updated successfully';
        showAlert.value = true;
      } catch (error) {
        console.error('Failed to update user data:', error);
        alertMessage.value = 'Failed to update profile';
        showAlert.value = true;
      } finally {
        loading.value = false;
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedProfilePic.value = file;
        profilePicPreview.value = URL.createObjectURL(file);
      }
    };

    const closeAlert = () => {
      showAlert.value = false;
    };

    const logout = () => {
      store.dispatch('logout');
      showLogoutConfirmation.value = false;
    };

    return {
      user,
      profilePicPreview,
      showAlert,
      alertMessage,
      loading,
      showLogoutConfirmation,
      showProfileCard,  // Expose showProfileCard
      updateUserData,
      handleFileChange,
      closeAlert,
      logout,
    };
  },
};
</script>





<style scoped>
#profile-pic {
  object-fit: cover;
  border-radius: 50%;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
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
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
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

/* Custom Alert Styles */
.alert-modal {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.alert-modal-content button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
