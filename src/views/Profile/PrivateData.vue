<template>
  <div class="flex flex-col bg-white">
    <NavFixed />
    <main class="flex flex-col items-end self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <section class="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <div class="w-[344px] h-[264px] relative">
            <!-- SelectionCard -->
          </div>
          <section class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <div class="flex flex-col grow mt-5 text-2xl text-black max-md:mt-10 max-md:max-w-full">
              <h2 class="text-3xl font-semibold max-md:max-w-full">Data Pribadi</h2>
              <div
                class="flex gap-5 items-start px-5 py-3.5 mt-14 rounded-xl border border-solid border-black border-opacity-60 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <label for="jenisKelamin" class="flex-auto my-auto">Jenis Kelamin</label>
                <select name="jenisKelamin" id="jenisKelamin" v-model="dataPribadi.jenisKelamin" class="input" required>
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div
                class="flex gap-5 px-6 py-5 mt-12 rounded-xl border border-solid border-black border-opacity-60 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <label for="tanggalLahir" class="flex-auto">Tanggal Lahir</label>
                <input type="date" name="tanggalLahir" id="tanggalLahir" v-model="dataPribadi.tanggalLahir"
                  class="input" required />
              </div>
              <div class="input-field">
                <label for="alamatRumah" class="sr-only">Alamat Rumah</label>
                <input type="text" name="alamatRumah" id="alamatRumah" v-model="dataPribadi.alamatRumah"
                  placeholder="Alamat Rumah" class="input" required />
              </div>
            </div>
          </section>
        </div>
      </section>
      <form @submit.prevent="saveData" class="mt-16 max-w-full w-[711px] max-md:mt-10">
        <!-- Form Kontak Darurat -->
      </form>
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';
import { API_URL } from '@/constants';
import NavFixed from "@/components/NavFixed.vue";
import Footer from '@/components/Footer.vue';

export default {
  components: {
    NavFixed,
    Footer
  },
  computed: {
    ...mapState(['user', 'token'])
  },
  methods: {
    ...mapActions(['initializeStore']),
    async fetchData() {
      if (this.user && this.token) {
        try {
          const response = await axios.get(`${API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

          if (response && response.data) {
            // Simpan data dari response ke dataPribadi dan kontakDarurat
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    },
    async saveData() {
      // Simpan data yang akan dikirim ke server
      const payload = {
        // Data yang akan disimpan
      };

      try {
        const response = await axios.post(`${API_URL}/profile/add-personal-data`, payload, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        console.log('Data updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating data:', error.response ? error.response.data : error.message);
      }
    }
  },
  async mounted() {
    await this.initializeStore();
    await this.fetchData();
  },
  data() {
    return {
      dataPribadi: {
        jenisKelamin: '',
        tanggalLahir: '',
        alamatRumah: ''
      },
      kontakDarurat: {
        namaLengkap: '',
        status: '',
        nomorTelepon: ''
      }
    };
  }
};
</script>

<style scoped>
.input-field {
  border: 1px solid #000;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-top: 2.5rem;
}

.input {
  border: none;
  outline: none;
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
}

.label-field {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
