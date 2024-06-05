<template>
  <div class="flex flex-col pb-14 bg-white">
    <Nav />
    <main class="flex flex-col self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <section class="mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <div class="w-[344px] h-[264px] relative">
            <SelectionCard />
          </div>
          <section class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <h3 class="text-3xl font-semibold text-black max-md:max-w-full">Ubah Data Profil</h3>
            <div
              class="flex flex-col items-center justify-center mt-11 ml-4 w-[100px] h-[100px] max-md:mt-10 max-md:ml-2.5 relative">
              <img id="profile-pic" loading="lazy" :src="imageProfileDefault" alt="Profile Picture"
                class="w-full h-full object-cover rounded-full">
              <label for="upload-profile-pic"
                class="absolute bottom-2 right-2 bg-sky-600 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center transition duration-300 hover:bg-sky-700">
                <i class="fas fa-pencil-alt text-white"></i>
                <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="updateProfilePic">
              </label>
            </div>
            <form class="mt-11 max-md:mt-10 max-md:max-w-full" @submit.prevent="updateUserData">
              <label for="fullName" class="sr-only">Nama Lengkap Sesuai KTP</label>
              <input type="text" id="fullName" v-model="user.name"
                class="px-4 py-5 mt-6 text-xl font-medium text-black rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
              <label for="phoneNumber" class="sr-only">Nomor Telepon</label>
              <input type="text" id="phoneNumber" v-model="user.phonenumber"
                class="px-4 py-6 mt-6 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
              <label for="emailAddress" class="sr-only">Email</label>
              <p id="emailAddress"
                class="px-4 py-5 mt-7 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                {{ user.email }}</p>
              <button type="submit"
                class="px-16 py-5 mt-16 text-2xl font-semibold text-white bg-sky-600 rounded-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">Ubah
                Data</button>
            </form>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Nav from '@/components/Nav.vue';
import SelectionCard from '@/components/SelectionProfile.vue';

export default {
  components: {
    Nav,
    SelectionCard,
  },
  data() {
    return {
      imageProfileDefault: '../src/assets/images/profile-pic.png',
    };
  },
  setup() {
    const store = useStore();

    const user = computed(() => {
      // Cek apakah data pengguna sudah disimpan di local storage
      const userData = JSON.parse(localStorage.getItem('userData'));
      return userData || store.getters.getUser;
    });

    // Simpan data pengguna ke local storage setelah komponen dimuat
    onMounted(() => {
      localStorage.setItem('userData', JSON.stringify(user.value));
    });

    const updateProfilePic = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target.result;
          sendImageToServer(imageDataUrl);
        };
        reader.readAsDataURL(file);
      }
    };

    const sendImageToServer = (imageDataUrl) => {
      fetch('https://nearus.id/api/profile/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${store.state.token}`,
        },
        body: JSON.stringify({ photoprofile: imageDataUrl }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to upload profile picture');
        }
        return response.json();
      })
      .then(data => {
        const imgElement = document.getElementById('profile-pic');
        if (imgElement) {
          imgElement.src = imageDataUrl;
        }
        console.log('Profile picture uploaded successfully:', data);
      })
      .catch(error => {
        console.error('Error uploading profile picture:', error);
      });
    };

    const updateUserData = () => {
      fetch('https://nearus.id/api/profile/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${store.state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.value.name,
          phonenumber: user.value.phonenumber,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user data');
        }
        return response.json();
      })
      .then(data => {
        console.log('User data updated successfully:', data);
        // Simpan data pengguna ke local storage setelah diperbarui
        localStorage.setItem('userData', JSON.stringify(user.value));
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
    };

    return {
      user,
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
  /* Set width */
  height: 100px;
  /* Set height */
}

label[for="upload-profile-pic"] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  /* Set width */
  height: 32px;
  /* Set height */
  padding: 0;
  /* Ensure no padding to keep it circular */
}
</style>
