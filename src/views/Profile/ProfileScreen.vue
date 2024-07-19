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
              <p class="text-sm text-gray-600">Details about your Personal Information</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h2 class="font-bold text-lg mb-2">Password & Security</h2>
              <router-link to="/passworddata" class="sidebar-option">Change password</router-link>
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
                <img id="profile-pic" loading="lazy" :src="profilePicSrc" alt="Profile Picture" class="w-20 h-20 rounded-full object-cover shadow-md">
                <label for="upload-profile-pic" class="absolute bottom-2 right-2 bg-sky-600 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center transition duration-300 hover:bg-sky-700 shadow-md">
                  <i class="fas fa-pencil-alt text-white"></i>
                  <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="updateProfilePic">
                </label>
              </div>
              <div class="ml-4">
                <h2 class="font-bold text-lg">Upload a New Photo</h2>
                <p class="text-gray-600">Profile-pic.jpg</p>
              </div>
              <button class="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
            </div>
            <h2 class="font-bold text-2xl mb-4">Ubah Informasi User</h2>
            <form class="space-y-4" @submit.prevent="updateUserData">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700">Nama Lengkap</label>
                  <input type="text" class="w-full border-gray-300 rounded-lg mt-1" v-model="user.name">
                </div>
                <div>
                  <label class="block text-gray-700">Email Address</label>
                  <input type="email" class="w-full border-gray-300 rounded-lg mt-1" v-model="user.email">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700">Nomor Telepon</label>
                  <input type="text" class="w-full border-gray-300 rounded-lg mt-1" v-model="user.city">
                </div>
                <div>
                  <label class="block text-gray-700">Jenis Kelamin</label>
                  <select class="w-full border-gray-300 rounded-lg mt-1" v-model="user.gender">
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-gray-700">Tanggal Lahir</label>
                  <input type="date" class="w-full border-gray-300 rounded-lg mt-1" v-model="user.zip">
                </div>
                <div>
                  <label class="block text-gray-700">Alamat Rumah</label>
                  <input type="text" class="w-full border-gray-300 rounded-lg mt-1" v-model="user.city">
                </div>
              </div>
              <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-6">Update Information</button>
            </form>
          </section>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/NavFixed.vue';
import Footer from '@/components/Footer.vue';
import imageProfileDefault from '@/assets/images/profile-pic.png';

export default {
  components: {
    NavFixed,
    Footer,
  },
  setup() {
    const store = useStore();
    const user = ref({
      name: '',
      email: '',
      phone: '', // Tambahkan nomor telepon
      gender: 'other', // Tambahkan jenis kelamin
      birthDate: '', // Tambahkan tanggal lahir
      address: '',
      photoprofile: '',
    });

    const profilePicSrc = computed(() => user.value.photoprofile || imageProfileDefault);

    const fetchUserData = async () => {
      try {
        const response = await fetch('https://api.nearus.id/api/profile', {
          headers: {
            'Authorization': `Bearer ${store.state.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        user.value = {
          name: data.name,
          email: data.email,
          phone: data.phone || '', // Ambil nomor telepon
          gender: data.gender || 'other', // Ambil jenis kelamin
          birthDate: data.birthDate || '', // Ambil tanggal lahir
          address: data.address,
          photoprofile: data.photoprofile,
        };
        localStorage.setItem('userData', JSON.stringify(user.value));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    onMounted(() => {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      } else {
        fetchUserData();
      }
    });

    const updateProfilePic = async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('photoprofile', file);

        try {
          await store.dispatch('updateUserProfilePic', formData);
          user.value.photoprofile = URL.createObjectURL(file);
        } catch (error) {
          console.error('Error uploading profile picture:', error);
        }
      }
    };

    const updateUserData = async () => {
      try {
        await store.dispatch('updateUserProfile', {
          name: user.value.name,
          email: user.value.email,
          phone: user.value.phone, // Kirim nomor telepon
          gender: user.value.gender, // Kirim jenis kelamin
          birthDate: user.value.birthDate, // Kirim tanggal lahir
          address: user.value.address,
        });
        console.log('User data updated successfully');
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    return {
      user,
      profilePicSrc,
      updateProfilePic,
      updateUserData,
    };
  },
};
</script>


<style scoped>
/* Your scoped styles here */
</style>
