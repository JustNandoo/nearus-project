<template>
  <div class="flex h-screen w-screen">
   <sidebar/>
    <div class="flex-1 flex flex-col pb-14">
      <main class="flex flex-col items-center px-5 mt-12 w-full">
        <section class="mt-16 w-full max-w-5xl">
          <div class="flex gap-5 max-md:flex-col max-md:gap-5">
            <div class="w-full md:w-[344px]">
              <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 class="font-bold text-lg mb-2">Account Settings</h2>
                <router-link to="/profile" class="sidebar-option">Change Profile</router-link>
                <p class="text-sm text-gray-600">Details about your Personal Information</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-md">
                <h2 class="font-bold text-lg mb-2">Password & Security</h2>
                <router-link to="/passworddata/:id" class="sidebar-option">Change password</router-link>
                <p class="text-sm text-gray-600">Changes your account Password</p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow-md mt-4">
                <router-link to="/login" class="sidebar-option">Logout</router-link>
              </div>
            </div>
            <!-- Main Content -->
            <section class="flex flex-col w-full">
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
                <button type="submit" class="button">Update Profile</button>
              </form>
            </section>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/NavFixed.vue';
import Sidebar from "@/components/sidebar.vue";

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

onMounted(() => {
  if (store.getters.getUser) {
    user.value = { ...store.getters.getUser };
  }
});

const updateUserData = async () => {
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

    alert('Profile updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    alert('Failed to update profile');
  }
};

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
}

.button:hover {
  background-color: #2563eb;
}
</style>
