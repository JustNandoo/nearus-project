//profile screen
<template>
  <div class="flex flex-col pb-14 bg-white">
    <NavFixed />
    <main class="flex flex-col self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <section class="mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
      
          <div class="w-[344px] h-[264px] relative">
            <SelectionCard />
          </div>
          <section class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <h3 class="text-3xl font-semibold text-black max-md:max-w-full">Ubah Data Profil</h3>
            <div class="flex items-center mt-11 ml-4 max-md:mt-10 max-md:ml-2.5 relative">
              <div class="w-[100px] h-[100px] relative">
                <img id="profile-pic" loading="lazy" :src="user.photoprofile || imageProfileDefault" alt="Profile Picture" class="w-full h-full object-cover rounded-full">
                <label for="upload-profile-pic" class="absolute bottom-2 right-2 bg-sky-600 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center transition duration-300 hover:bg-sky-700">
                  <i class="fas fa-pencil-alt text-white"></i>
                  <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="updateProfilePic">
                </label>
              </div>
            </div>
            <form class="mt-11 max-md:mt-10 max-md:max-w-full" @submit.prevent="updateUserData">
              <div class="flex flex-col mb-6">
                <label for="fullName" class="text-xl font-medium text-black">Username </label>
                <input type="text" id="fullName" v-model="user.name" class="input-field">
              </div>
              <div class="flex flex-col mb-6">
                <label for="phoneNumber" class="text-xl font-medium text-black">Nomor Telepon</label>
                <input type="text" id="phoneNumber" v-model="user.phonenumber" class="input-field">
              </div>
              <div class="flex flex-col mb-6">
                <label for="emailAddress" class="text-xl font-medium text-black">Email ( tidak dapat diubah )</label>
                <p id="emailAddress" class="input-field">{{ user.email }}</p>
              </div>
              <button type="submit" class="button">Ubah Data</button>
            </form>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/NavFixed.vue';
import SelectionCard from '@/components/SelectionProfile.vue';

export default {
  components: {
    NavFixed,
    SelectionCard,
  },
  setup() {
    const store = useStore();
    const user = ref({
      name: '',
      phonenumber: '',
      email: '',
      photoprofile: '',
    });

    const imageProfileDefault = 'path/to/default/image.jpg';

    // Fungsi untuk mengambil data pengguna dari API
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://nearus.id/api/profile', {
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
          phonenumber: data.phonenumber,
          email: data.email,
          photoprofile: data.photoprofile,
        };

        // Simpan data pengguna ke local storage
        localStorage.setItem('userData', JSON.stringify(user.value));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Saat komponen dimuat, ambil data pengguna dari API atau local storage
    onMounted(() => {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      } else {
        fetchUserData();
      }
    });

    // Fungsi untuk mengunggah foto profil baru
    const updateProfilePic = async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('photoprofile', file);

        try {
          const response = await fetch('https://nearus.id/api/profile/update', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${store.state.token}`,
            },
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload profile picture');
          }

          const data = await response.json();
          document.getElementById('profile-pic').src = URL.createObjectURL(file);

          // Simpan URL foto profil baru ke local storage
          const updatedUser = { ...user.value, photoprofile: data.photoprofile };
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          user.value.photoprofile = data.photoprofile;

          console.log('Profile picture uploaded successfully:', data);
        } catch (error) {
          console.error('Error uploading profile picture:', error);
        }
      }
    };

    // Fungsi untuk memperbarui data pengguna
    const updateUserData = async () => {
      try {
        const response = await fetch('https://nearus.id/api/profile/update', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${store.state.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.value.name,
            phonenumber: user.value.phonenumber,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user data');
        }

        const data = await response.json();

        // Simpan data pengguna baru ke local storage
        localStorage.setItem('userData', JSON.stringify(user.value));

        console.log('User data updated successfully:', data);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    return {
      user,
      imageProfileDefault,
      updateProfilePic,
      updateUserData,
    };
  },
};
</script>
<style scoped>
#profile-pic {
  object-fit: cover;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.label-field {
  @apply text-xl font-medium text-black;
}

.input-field {
  @apply px-4 py-5 mt-3 rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full;
}

.button {
  @apply px-16 py-5 mt-6 text-2xl font-semibold text-white bg-sky-600 rounded-xl max-md:px-5 max-md:mt-10 max-md:max-w-full;
}
</style>
