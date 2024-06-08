<template>
  <div class="flex flex-col bg-white">
    <NavFixed />
    <main class="flex flex-col items-end self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <section class="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="grid grid-cols-1 max-md:grid-cols-none max-md:gap-0 max-md:grid-flow-row md:grid-cols-[344px,1fr] gap-5">
          <div class="w-full h-[264px] max-md:h-auto relative">
            <SelectionProfile class="align-self-start" />
          </div>
          <section class="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
            <div class="flex flex-col mt-5 text-2xl text-black max-md:mt-10 max-md:max-w-full">
              <h2 class="text-3xl font-semibold max-md:max-w-full">Data Pribadi</h2>
              <div class="grid grid-cols-1 gap-5 max-md:grid-cols-none max-md:gap-0 max-md:grid-flow-row">
                <div class="input-field">
                  <label for="jenisKelamin" class="label-field">Jenis Kelamin</label>
                  <select name="jenisKelamin" id="jenisKelamin" v-model="dataPribadi.jenisKelamin" class="input" required>
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  </div>
                  <div class="input-field">
                    <label for="tanggalLahir" class="label-field">Tanggal Lahir</label>
                    <input type="date" name="tanggalLahir" id="tanggalLahir" v-model="dataPribadi.tanggalLahir" class="input" required />
                  </div>
                  <div class="input-field">
                    <label for="alamatRumah" class="label-field">Alamat Rumah</label>
                    <input type="text" name="alamatRumah" id="alamatRumah" v-model="dataPribadi.alamatRumah" placeholder="Alamat Rumah" class="input" required />
                  </div>
              </div>
            </div>
            <form @submit.prevent="saveData" class="mt-16 max-w-full w-[711px] max-md:mt-10">
        <h2 class="mt-16 text-3xl font-semibold max-md:mt-10 max-md:max-w-full">Kontak Darurat</h2>
        <div class="input-field">
          <label for="namaPanjang" class="sr-only">Nama Panjang</label>
          <input 
            type="text" 
            id="namaPanjang" 
            v-model="kontakDarurat.namaLengkap"
            class="input" 
            placeholder="Nama Panjang" 
            required
          />
        </div>
        <div class="flex gap-5 justify-between items-center input-field mt-11 max-w-full w-[711px] max-md:flex-wrap max-md:mt-10">
          <div class="my-auto">Status</div>
          <input 
            type="text" 
            name="status" 
            id="status" 
            v-model="kontakDarurat.status"
            class="input"
            placeholder="Status"
            required 
          />
        </div>
        <div class="flex gap-5 mt-11 max-w-full w-[711px] max-md:flex-wrap max-md:mt-10">
          <div class="shrink-0 border border-solid aspect-[1.67] border-black border-opacity-60 w-[100px] h-[120px] flex items-center justify-center">
            +62
          </div>  
          <div class="input-field flex-auto">
            <label for="nomorTelepon" class="sr-only">Nomor Telepon</label>
            <input 
              type="tel" 
              name="nomorTelepon" 
              id="nomorTelepon" 
              v-model="kontakDarurat.nomorTelepon"
              placeholder="Nomor Telepon" 
              class="input"
              required
            />
          </div>
        </div>
        <button type="submit" class="justify-center items-center px-16 py-4 mt-16 max-w-full text-2xl font-semibold text-white whitespace-nowrap bg-sky-600 rounded-xl w-[711px] max-md:px-5 max-md:mt-10">
          Simpan
        </button>
      </form>
          </section>
        </div>
      </section>
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
import SelectionProfile from '@/components/SelectionProfile.vue';

export default {
  components: {
    NavFixed,
    Footer,
    SelectionProfile
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
            const userData = response.data.data;
            this.dataPribadi = {
              jenisKelamin: userData.dataPribadi.jenisKelamin || '',
              tanggalLahir: userData.dataPribadi.tanggalLahir || '',
              alamatRumah: userData.dataPribadi.alamatRumah || ''
            };
            this.kontakDarurat = {
              namaLengkap: userData.kontakDarurat.namaLengkap || '',
              status: userData.kontakDarurat.status || '',
              nomorTelepon: userData.kontakDarurat.nomorTelepon || ''
            };
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    },
    async saveData() {
      const payload = {
        dataPribadi: {
          jenisKelamin: this.dataPribadi.jenisKelamin,
          tanggalLahir: this.dataPribadi.tanggalLahir,
          alamatRumah: this.dataPribadi.alamatRumah
        },
        kontakDarurat: {
          namaLengkap: this.kontakDarurat.namaLengkap,
          status: this.kontakDarurat.status,
          nomorTelepon: this.kontakDarurat.nomorTelepon
        }
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
