<template>
  <div class="full-screen-bg flex items-center justify-center h-screen">
    <div class="container w-[1595px] h-[867px] relative">
      <div class="w-[1595px] h-[867px] relative">
        <div class="w-[1595px] h-[867px] relative">
          <div class="w-[1595px] h-[865px] left-0 top-[2px] absolute bg-white rounded-[20px] shadow"></div>
          <div class="w-[646px] h-[817px] left-[920px] top-[25px] absolute" id="onBoardingCard">
            <img class="image w-[646px] h-[817px]" :src="imagePath" />
            <div
              class="h-[243px] left-[147px] top-[287px] absolute flex-col justify-start items-start gap-[33px] inline-flex">
              <div class="w-[340px] text-white text-[26px] font-bold font-sans">Anda anak merantau? kesulitan mencari
                kos? banyak kos yang tidak cocok?</div>
              <div class="w-[351px] text-white text-lg font-normal font-sans">Nearus hadir sebagai platform website
                pencari kos disekitar anda dengan kriteria yang sesuai.</div>
              <div class="w-[312px] h-[15px] justify-center items-start gap-3 inline-flex">
                <div class="w-24 h-[15px] bg-white shadow"></div>
                <div class="w-[95px] h-[15px] bg-white bg-opacity-40 shadow"></div>
                <div class="w-24 h-[15px] bg-white bg-opacity-40 shadow"></div>
              </div>
            </div>
          </div>
          <div class="w-[571px] h-[817px] left-[68px] top-[25px] absolute">
            <div class="w-[180px] h-[49px] left-0 top-[36px] absolute">
              <img class="left-0 top-0 absolute" :src="imageLogo" />
              <div class="w-4 h-4 left-[118px] top-[1px] absolute"></div>
              <div class="w-2 h-[8.17px] left-[137px] top-[5.87px] absolute bg-sky-600 rounded-full"></div>
            </div>
            <div
              class="w-[600px] left-0 top-[117px] absolute text-black text-[34px] font-bold font-sans leading-[41.48px] tracking-wide">
              Selamat Datang, Silahkan Daftar untuk lanjut </div>
            <div class="w-[571px] h-[90px] left-0 top-[220px] absolute" id="EmailNput">
              <label for="emailInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal"
                @click="focusEmailInput">Alamat Email</label>
              <input id="emailInput" ref="emailInput" type="email"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]"
                placeholder="Masukkan Email Anda" />
            </div>
            <div class="w-[571px] h-[90px] left-0 top-[350px] absolute" id="NamaInput">
              <label for="nameInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal"
                @click="focusNameInput">Nama Lengkap</label>
              <input id="nameInput" ref="nameInput" type="text" name="name"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]"
                placeholder="Masukkan Nama Anda" />
            </div>
            <div class="w-[571px] h-[90px] left-0 top-[480px] absolute" id="NomorTeleponInput">
              <label for="nomorteleponInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal"
                @click="focusNomorTeleponInput">Nomor Telepon</label>
              <input id="nomorteleponInput" ref="NomorTeleponInput" type="text"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]"
                placeholder="Masukkan Nomor Telepon Anda" />
            </div>
            <div class="w-[571px] h-[90px] left-0 top-[610px] absolute" id="PasswordInput">
              <label for="passwordInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal">Kata
                Sandi</label>
              <input id="passwordInput" ref="passwordInput" type="password"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]"
                placeholder="Masukkan Kata Sandi Anda" />
              <button @click="togglePasswordVisibility"
                class="absolute right-0 top-[50%] transform -translate-y-1/2 mr-2">
                <i v-if="passwordVisible" class="fas fa-eye text-lg" style="margin-top: 40px;"></i>
                <i v-else class="fas fa-eye-slash text-lg" style="margin-top: 40px;"></i>
              </button>
            </div>
            <div class="w-[202px] h-[54px] left-[369px] top-[730px] absolute">
              <router-link to="/login">
                <div
                  class="w-[202px] h-[54px] left-0 top-0 absolute rounded-[5px] border-2 border-sky-300 hover:border-sky-400 transition duration-300"
                  style="border-width: 4px;"></div>
                <div class="left-[73px] top-[13px] absolute text-black text-lg font-bold font-sans hover:text-sky-600">
                  Login</div>
              </router-link>
            </div>

            <button
              class="w-[266px] h-[54px] left-0 top-[730px] absolute transition duration-300 ease-in-out transform hover:scale-105"
              id="btn-signUp" @click="registerUser">
              <div class="w-[266px] h-[54px] left-0 top-0 absolute bg-gradient-to-r from-sky-300 to-blue-500 shadow">
              </div>
              <div class="left-[65px] top-[15px] absolute text-white text-xl font-bold font-sans">SignUp</div>
              <div class="w-6 h-6 left-[220px] top-[15px] absolute flex items-center justify-center">
                <i class="fas fa-chevron-right text-white"></i>
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from '@/constants.js';

export default {
  data() {
    return {
      imagePath: '../src/assets/images/bg-loginPage.png',
      imageLogo: '../src/assets/images/nearus.png',
      rememberMe: false,
      passwordVisible: false
    };
  },
  methods: {
    focusEmailInput() {
      this.$refs.emailInput.focus();
    },
    focusNameInput() {
      this.$refs.nameInput.focus();
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      const passwordInput = this.$refs.passwordInput;
      passwordInput.type = this.passwordVisible ? 'text' : 'password';
    },
    registerUser() {
      const userData = {
        email: this.$refs.emailInput.value,
        name: this.$refs.nameInput.value,
        phonenumber: this.$refs.NomorTeleponInput.value,
        password: this.$refs.passwordInput.value,
        rememberMe: this.rememberMe
      };

      axios.post(`${API_URL}/daftaruser`, userData)
        .then(response => {
          if (response.data.success) {
            alert('Pendaftaran berhasil!');
            const verificationToken = response.data.token;
            this.$router.push({ name: 'emails.verify', params: { token: verificationToken } });
          } else {
            if (response.data.errorCode === 'EMAIL_ALREADY_EXISTS') {
              alert('Email sudah digunakan akun lain. Silakan gunakan email lain.');
            } else {
              alert('Pendaftaran gagal. Mohon coba lagi.');
            }
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Terjadi kesalahan. Mohon coba lagi.');
        });
    },
    login() {
      console.log('Login clicked');
    }
  }
};
</script>


<style scoped>
.full-screen-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: url('@/assets/images/bg-loginPage.png') center/cover no-repeat;
}
</style>
