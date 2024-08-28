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
              <router-link to="/passworddata/:id" class="sidebar-option">Change password</router-link>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md mt-4">
              <router-link to="/login" class="sidebar-option">Logout</router-link>
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
            <h2 class="font-bold text-2xl mb-4">Ubah Informasi User</h2>
            <p class="text-sm text-gray-600">Details about your Personal Information</p>
            <form class="space-y-4" @submit.prevent="updateUserData">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700">Nama Lengkap</label>
                  <input type="text" class="input-field" v-model="user.name">
                </div>
                <div>
                  <label class="block text-gray-700">Email Address</label>
                  <input type="email" class="input-field" v-model="user.email">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700">Nomor Telepon</label>
                  <input type="text" class="input-field" v-model="user.phone">
                </div>
                <div>
                  <label class="block text-gray-700">Jenis Kelamin</label>
                  <select class="input-field" v-model="user.gender">
                    <option value="male">Pria</option>
                    <option value="female">Wanita</option>
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
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p>Loading...</p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/Pages/NavFixed.vue';
import LogoutConfirmation from '@/components/Profile/LogoutConfirmation.vue';
import Footer from '@/components/Pages/Footer.vue';

export default {
  components: { NavFixed, Footer, LogoutConfirmation },
  setup() {
    const store = useStore();
    const user = ref({
      name: '',
      email: '',
      phone: '',
      gender: '',
      photoprofile: '',
    });
    const selectedProfilePic = ref(null);
    const profilePicPreview = ref(null);
    const showAlert = ref(false);
    const alertMessage = ref('');
    const loading = ref(false);
    const showLogoutConfirmation = ref(false);

    onMounted(async () => {
      try {
        await store.dispatch('fetchUserData');
        const userData = store.getters.getUser;
        if (userData) {
          user.value = {
            ...user.value,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            gender: userData.gender,
            photoprofile: userData.photoprofile,
          };
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });

    const updateUserData = async () => {
      loading.value = true;
      try {
        const updatedProfileData = {
          jenis_kelamin: user.value.gender || null,
        };

        const contactInfo = {
          name: user.value.name || null,
          email: user.value.email || null,
          phonenumber: user.value.phone || null,
        };

        if (updatedProfileData.jenis_kelamin) {
          await store.dispatch('updateUserProfile', updatedProfileData);
        }

        if (Object.values(contactInfo).some(value => value !== null)) {
          await store.dispatch('updateUserContactInfo', contactInfo);
          store.commit('setUser', {
            ...store.getters.getUser,
            ...contactInfo,
          });
        }

        if (selectedProfilePic.value) {
          const formData = new FormData();
          formData.append('photoprofile', selectedProfilePic.value);
          await store.dispatch('updateUserProfilePic', formData);
        }

        alertMessage.value = 'Profile updated successfully';
        showAlert.value = true;
      } catch (error) {
        console.error('Error updating user data:', error);
        alertMessage.value = 'Failed to update profile';
        showAlert.value = true;
      } finally {
        loading.value = false;
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        selectedProfilePic.value = file;
        const reader = new FileReader();
        reader.onload = () => {
          profilePicPreview.value = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const closeAlert = () => {
      showAlert.value = false;
    };

    const logout = () => {
      showLogoutConfirmation.value = false;
      store.dispatch('logout');
    };

    return {
      user,
      updateUserData,
      handleFileChange,
      profilePicPreview,
      showAlert,
      alertMessage,
      closeAlert,
      loading,
      showLogoutConfirmation,
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

.label-field {
  font-size: 1rem;
  font-weight: 500;
  color: #4a4a4a;
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

.alert-modal-content button
{
background-color: #2563eb;
}
</style>