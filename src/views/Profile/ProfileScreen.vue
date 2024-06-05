<template>
  <div class="flex flex-col pb-14 bg-white">
    <Nav />
    <main class="flex flex-col self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <section class="mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <div class="w-[344px] h-[264px] relative">
            <SelectionCard/>
          </div>
          <section class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <h3 class="text-3xl font-semibold text-black max-md:max-w-full">Ubah Data Profil</h3>
            <div
              class="flex flex-col items-end px-16 pt-20 pb-2 mt-11 ml-4 w-56 max-w-full rounded-full aspect-square max-md:pl-5 max-md:mt-10 max-md:ml-2.5 relative">
              <img id="profile-pic" loading="lazy" :src="imageProfileDefault" alt="Profile Picture"
                class="w-full h-full object-cover rounded-full" />
              <label for="upload-profile-pic"
                class="absolute bottom-4 right-4 bg-sky-600 rounded-full p-2 cursor-pointer">
                <i class="fas fa-pencil-alt text-white"></i>
                <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="updateProfilePic">
              </label>
            </div>
            <form class="mt-11 max-md:mt-10 max-md:max-w-full">
              <label for="fullName" class="sr-only" id="name">Nama Lengkap Sesuai KTP</label>
              <p id="fullName"
                class="justify-center items-start px-4 py-5 mt-6 text-xl font-medium text-black rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                {{ user.name }}
              </p>
              <label for="phoneNumber" class="sr-only" id="nomor">Nomor Telepon</label>
              <p id="phoneNumber"
                class="justify-center items-start px-4 py-6 mt-6 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                {{ user.phonenumber }}
              </p>
              <label for="emailAddress" class="sr-only" id="email">Email</label>
              <p id="emailAddress"
                class="justify-center items-start px-4 py-5 mt-7 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                {{ user.email }}
              </p>
              <button type="submit"
                class="justify-center items-center px-16 py-5 mt-16 text-2xl font-semibold text-white bg-sky-600 rounded-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">Ubah
                Data</button>
            </form>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
import Nav from "@/components/Nav.vue";
import SelectionCard from '@/components/SelectionProfile.vue';

export default {
  components: {
    Nav,
    SelectionCard,
  },

  data(){
    return{
      imageProfileDefault: '../src/assets/images/profile-pic.png',
    };
  },
  setup() {
    const store = useStore();

    const user = computed(() => {
      const userData = store.getters.getUser;
      console.log('User data in Profile:', userData);
      return userData;
    });

    const updateProfilePic = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgElement = document.getElementById('profile-pic');
          if (imgElement && e.target) {
            imgElement.src = e.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      user,
      updateProfilePic,
    };
  },
}
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
