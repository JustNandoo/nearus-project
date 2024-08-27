<template>
  <div class="flex h-screen w-screen">
    <sidebar />
    <div class="flex-1 flex flex-col pb-14">
      <main class="flex flex-col items-center px-5 mt-12 w-full">
        <section class="mt-16 w-full max-w-5xl mx-auto">
          <div class="flex justify-center">
            <!-- Main Content -->
            <section class="flex flex-col w-full max-w-3xl">
              <div class="flex items-center mb-6">
                <div class="relative">
                  <img id="profile-pic" loading="lazy" :src="user.photoprofile || placeholderImage" alt="Profile Picture" class="w-20 h-20 rounded-full object-cover shadow-md">
                  <label for="upload-profile-pic" class="absolute bottom-2 right-2 bg-sky-600 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center transition duration-300 hover:bg-sky-700 shadow-md">
                    <i class="fas fa-pencil-alt text-white"></i>
                    <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="handleFileChange">
                  </label>
                </div>
                <div class="ml-4">
                  <h2 class="font-bold text-lg">Upload a New Photo</h2>
                  <p class="text-gray-600">{{ user.photoprofile ? 'Profile-pic.jpg' : 'No photo uploaded' }}</p>
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
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>
                <button type="submit" class="button" :disabled="loading">
                  <span v-if="loading" class="loader"></span>
                  <span v-else>Update Profile</span>
                </button>
              </form>
              <div v-if="alertMessage" class="mt-4">
                <CustomAlert :message="alertMessage" :type="alertType" @close="alertMessage = ''" />
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
import CustomAlert from '@/components/Profile/CustomAlert.vue';

const placeholderImage = 'https://via.placeholder.com/150';
const store = useStore();
const user = ref({
  name: '',
  email: '',
  phone: '',
  gender: '',
  photoprofile: '',
});
const selectedProfilePic = ref(null);
const loading = ref(false);
const alertMessage = ref('');
const alertType = ref('success');

// Load user data from the store when the component is mounted
onMounted(async () => {
  await store.dispatch('initializeStore'); // Ensure local storage data is loaded
  const userData = store.getters.getUser;
  if (userData) {
    user.value = { ...userData };
  } else {
    console.warn('User data is undefined or not loaded correctly.');
  }
});

// Watch the user object and update the Vuex store whenever it changes
watch(user, (newUser) => {
  store.commit('setUser', newUser);
}, { deep: true });

// Function to update user profile data
const updateUserData = async () => {
  loading.value = true;
  try {
    const updatedProfileData = {
      name: user.value.name || null,
      email: user.value.email || null,
      phonenumber: user.value.phone || null,
      jenis_kelamin: user.value.gender || null,
    };

    if (Object.values(updatedProfileData).some(value => value !== null)) {
      await store.dispatch('updateUserProfile', updatedProfileData);
    }

    if (selectedProfilePic.value) {
      const formData = new FormData();
      formData.append('photoprofile', selectedProfilePic.value);
      await store.dispatch('updateUserProfilePic', formData);
    }

    alertType.value = 'success';
    alertMessage.value = 'Profile updated successfully';
  } catch (error) {
    console.error('Error updating user data:', error);
    alertType.value = 'error';
    alertMessage.value = 'Failed to update profile';
  } finally {
    loading.value = false;
  }
};

// Function to handle file selection for profile picture update
const handleFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    selectedProfilePic.value = file;

    const reader = new FileReader();
    reader.onload = () => {
      user.value.photoprofile = reader.result;
    };
    reader.readAsDataURL(file);
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.button:disabled {
  background-color: #a1a1aa;
  cursor: not-allowed;
}

.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  width: 16px;
  height: 16px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
