<template>
  <div class="flex flex-col bg-white">
    <NavFixed />
    <main class="flex flex-col items-end self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <section class="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <div class="w-[344px] h-[264px] relative">
            <SelectionCard />
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
              <h2 class="mt-16 text-3xl font-semibold max-md:mt-10 max-md:max-w-full">Kontak Darurat</h2>
            </div>
          </section>
        </div>
      </section>
      <form @submit.prevent="saveData" class="mt-16 max-w-full w-[711px] max-md:mt-10">
        <div class="input-field">
          <label for="namaPanjang" class="sr-only">Nama Panjang</label>
          <input type="text" id="namaPanjang" v-model="kontakDarurat.namaLengkap" class="input"
            placeholder="Nama Panjang" required />
        </div>
        <div
          class="flex gap-5 justify-between items-center input-field mt-11 max-w-full w-[711px] max-md:flex-wrap max-md:mt-10">
          <div class="my-auto">Status</div>
          <input type="text" name="status" id="status" v-model="kontakDarurat.status" class="input" placeholder="Status"
            required />
        </div>
        <div class="flex gap-5 mt-11 max-w-full w-[711px] max-md:flex-wrap max-md:mt-10">
          <div
            class="shrink-0 border border-solid aspect-[1.67] border-black border-opacity-60 w-[122px] flex items-center justify-center">
            +62
          </div>
          <div class="input-field flex-auto">
            <label for="nomorTelepon" class="sr-only">Nomor Telepon</label>
            <input type="tel" name="nomorTelepon" id="nomorTelepon" v-model="kontakDarurat.nomorTelepon"
              placeholder="Nomor Telepon" class="input" required />
          </div>
        </div>
        <button type="submit"
          class="justify-center items-center px-16 py-4 mt-16 max-w-full text-2xl font-semibold text-white whitespace-nowrap bg-sky-600 rounded-xl w-[711px] max-md:px-5 max-md:mt-10">
          Simpan
        </button>
      </form>
    </main>
    <Footer />
  </div>
</template>

<script>
import NavFixed from "@/components/NavFixed.vue";
import Footer from "@/components/Footer.vue";
import SelectionCard from '@/components/SelectionProfile.vue';
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import { API_URL } from '@/constants';
import NavFixed from "@/components/NavFixed.vue";

export default {
  components: {
    SelectionCard,
    NavFixed,
    Footer
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

          // Check if the response data is an array
          if (Array.isArray(response.data)) {
            // Assume the first object in the array contains the user data
            const userData = response.data[0];

            // Check if the user data object exists and has the expected structure
            if (userData && userData["Data Pribadi"] && userData["Kontak Darurat"]) {
              this.dataPribadi = {
                jenisKelamin: String(userData["Data Pribadi"]["Jenis Kelamin"] || ''),
                tanggalLahir: String(userData["Data Pribadi"]["Tanggal Lahir"] || ''),
                alamatRumah: String(userData["Data Pribadi"]["Alamat Rumah"] || '')
              };

              this.kontakDarurat = {
                namaLengkap: String(userData["Kontak Darurat"]["Nama Lengkap"] || ''),
                status: String(userData["Kontak Darurat"]["Status"] || ''),
                nomorTelepon: String(userData["Kontak Darurat"]["Nomor Telepon"] || '')
              };
            } else {
             
              console.error('User data structure is invalid:', userData);
            }
          } else {
            console.error('Invalid response data format:', response.data);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    },

    async saveData() {
      // Ensure all data is converted to string and follows the API format
      const payload = {
        "jenis_kelamin": String(this.dataPribadi.jenisKelamin),
        "tanggal_lahir": String(this.dataPribadi.tanggalLahir),
        "alamat_rumah": String(this.dataPribadi.alamatRumah),
        "urgent_fullname": String(this.kontakDarurat.namaLengkap),
        "urgent_status": String(this.kontakDarurat.status),
        "urgent_phonenumber": String(this.kontakDarurat.nomorTelepon)
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
  }
}
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
