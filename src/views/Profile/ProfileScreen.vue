<template>
  <div class="flex flex-col pb-14 bg-gray-100 min-h-screen">
    <NavFixed />
    <main class="flex flex-col items-center px-5 mt-12 w-full">
      <section class="mt-16 w-full max-w-5xl">
        <div class="flex gap-5 max-md:flex-col max-md:gap-5">
          <div class="w-full md:w-[344px] h-[264px] relative">
            <SelectionCard />
          </div>
          <section class="flex flex-col w-full max-md:w-full">
            <h3 class="text-3xl font-semibold text-black">Ubah Data Profil</h3>
            <div class="flex items-center mt-11 relative">
              <div class="w-[100px] h-[100px] relative">
                <img id="profile-pic" loading="lazy" :src="user.photoprofile || imageProfileDefault"
                  alt="Profile Picture" class="w-full h-full object-cover rounded-full shadow-md">
                <label for="upload-profile-pic"
                  class="absolute bottom-2 right-2 bg-sky-600 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center transition duration-300 hover:bg-sky-700 shadow-md">
                  <i class="fas fa-pencil-alt text-white"></i>
                  <input type="file" id="upload-profile-pic" class="hidden" accept="image/*" @change="updateProfilePic">
                </label>
              </div>
            </div>
            <form class="mt-11 w-full" @submit.prevent="updateUserData">
              <div class="flex flex-col mb-6">
                <label for="fullName" class="label-field">Username </label>
                <input type="text" id="fullName" v-model="user.name" class="input-field">
              </div>
              <div class="flex flex-col mb-6">
                <label for="phoneNumber" class="label-field">Nomor Telepon</label>
                <input type="text" id="phoneNumber" v-model="user.phonenumber" class="input-field">
              </div>
              <div class="flex flex-col mb-6">
                <label for="emailAddress" class="label-field">Email ( tidak dapat diubah )</label>
                <p id="emailAddress" class="input-field">{{ user.email }}</p>
              </div>
              <button type="submit" class="button">Ubah Data</button>
            </form>
          </section>
        </div>
      </section>
    </main>
  </div>
  <Footer />
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import NavFixed from '@/components/NavFixed.vue';
import SelectionCard from '@/components/SelectionProfile.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NavFixed,
    SelectionCard,
    Footer
  },
  setup() {
    const store = useStore();
    const user = ref({
      name: '',
      phonenumber: '',
      email: '',
      photoprofile: '',
    });

    const imageProfileDefault = '@/assets/images/profile-pic.png';
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


          const updatedUser = { ...user.value, photoprofile: data.photoprofile };
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          user.value.photoprofile = data.photoprofile;

          console.log('Profile picture uploaded successfully:', data);
        } catch (error) {
          console.error('Error uploading profile picture:', error);
        }
      }
    };


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
  font-size: 1.25rem;
  font-weight: 500;
  color: #000;
}

.input-field {
  padding: 1rem;
  margin-top: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.6);
  max-width: 100%;
}

.button {
  padding: 1rem 4rem;
  margin-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  background-color: #0986cf;
  border-radius: 0.75rem;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #1D4ED8;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
