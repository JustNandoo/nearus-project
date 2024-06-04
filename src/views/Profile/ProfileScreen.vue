<template>
  <div class="flex flex-col pb-14 bg-white">
    <Nav />
    <main class="flex flex-col self-center px-5 mt-16 max-w-full w-[1208px] max-md:mt-10"> <!-- Changed mt-12 to mt-16 -->
      <h2 class="text-3xl font-bold text-black max-md:max-w-full">Pengaturan</h2>
      <section class="mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <aside class="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
            <div class="flex flex-col pt-1 pb-6 text-xl text-black rounded-xl border border-solid border-black border-opacity-60 max-md:mt-10">
              <router-link
                to="/profile"
                class="justify-center items-start px-6 py-6 rounded-3xl border-b border-solid border-black border-opacity-60 max-md:px-5">
                Ubah Data Profil
              </router-link>
              <router-link
                to="/privatedata"
                class="justify-center items-start px-6 py-6 rounded-3xl border-b border-solid border-black border-opacity-60 max-md:px-5">
                Data pribadi
              </router-link>
              <router-link
                to="/passworddata"
                class="justify-center items-start px-6 py-6 rounded-3xl border-b border-solid border-black border-opacity-60 max-md:px-5">
                Ubah Kata sandi
              </router-link>
            </div>
          </aside>
          <section class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <h3 class="text-3xl font-semibold text-black max-md:max-w-full">Ubah Data Profil</h3>
            <div class="flex flex-col items-end px-16 pt-20 pb-2 mt-11 ml-4 w-56 max-w-full rounded-full aspect-square max-md:pl-5 max-md:mt-10 max-md:ml-2.5 relative">
              <img id="profile-pic" loading="lazy" src="../src/assets/images/profile-pic.png" alt="Profile Picture" class="w-full h-full object-cover rounded-full"/>
              <label for="upload-profile-pic" class="absolute bottom-4 right-4 bg-sky-600 rounded-full p-2 cursor-pointer">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/489b933a-693d-460e-b794-6859ef5bb1d0?apiKey=dbb585655fed49b6b0cf3f986b221850&" class="w-6 h-6" alt="Edit Icon" />
                <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="updateProfilePic">
              </label>
            </div>
            <form class="mt-11 max-md:mt-10 max-md:max-w-full">
              <label for="fullName" class="sr-only" id="name">Nama Lengkap Sesuai KTP</label>
              <p id="fullName" class="justify-center items-start px-4 py-5 mt-6 text-xl font-medium text-black rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                {{ user.name }}
              </p>
              <label for="phoneNumber" class="sr-only" id="nomor">Nomor Telepon</label>
              <p id="phoneNumber" class="justify-center items-start px-4 py-6 mt-6 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                {{ user.phone }}
              </p>
              <label for="emailAddress" class="sr-only" id="email">Email</label>
              <p id="emailAddress" class="justify-center items-start px-4 py-5 mt-7 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                {{ user.email }}
              </p>
              <button type="submit" class="justify-center items-center px-16 py-5 mt-16 text-2xl font-semibold text-white bg-sky-600 rounded-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">Ubah Data</button>
            </form>
          </section>
        </div>
      </section>
    </main>
  </div>
  <FooterComponent />
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Nav from '@/components/Nav.vue';
import FooterComponent from "@/components/Footer.vue";

export default {
  components: {
    Nav,
    FooterComponent
  },
  setup() {
    const user = ref({
      name: 'Data kosong',
      email: 'Data kosong',
      phone: 'Data kosong'
    });

    onMounted(async () => {
      try {
        const response = await axios.get('https://nearus.id/api/user');
        const data = response.data;
        const userData = data.find(user => user.ownerId === 8);
        if (userData) {
          user.value = {
            name: userData.name || 'Data kosong',
            email: userData.email || 'Data kosong',
            phone: userData.phonenumber || 'Data kosong'
          };
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });

    const updateProfilePic = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgElement = document.getElementById('profile-pic');
          if (imgElement instanceof HTMLImageElement) {
            imgElement.src = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      user,
      updateProfilePic
    };
  }
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
