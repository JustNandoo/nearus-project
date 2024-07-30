<template>
    <div class="full-screen-bg flex items-center justify-center h-screen">
      <div class="container w-[1595px] h-[867px] relative">
        <div class="w-[1595px] h-[867px] relative">
          <div class="w-[1595px] h-[865px] left-0 top-[2px] absolute bg-white rounded-[20px] shadow"></div>
          <div class="w-[646px] h-[817px] left-[920px] top-[25px] absolute" id="onBoardingCard">
            <img class="image w-[646px] h-[817px]" :src="imagePath" />
            <div
              class="h-[243px] left-[147px] top-[287px] absolute flex-col justify-start items-start gap-[33px] inline-flex">
              <div class="w-[340px] text-white text-[26px] font-bold font-sans">Anda anak merantau? kesulitan mencari kos?
                banyak kos yang tidak cocok?</div>
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
              class="w-[700px] left-0 top-[117px] absolute text-black text-[34px] font-bold font-sans leading-[41.48px] tracking-wide">
              Silahkan lanjut mengisi beberapa data mengenai kos anda</div>
            <div class="w-[571px] h-[90px] left-0 top-[280px] absolute" id="NamaInput">
              <label for="namaInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal"
                @click="focusNamaInput">Nama Kos</label>
              <input id="namaInput" ref="namaInput" type="text"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]"
                placeholder="Masukkan nama kos anda" />
            </div>
            <div class="w-[571px] h-[90px] left-0 top-[390px] absolute" id="EmailNput">
              <label for="emailInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal"
                @click="focusAlamatInput">Alamat Kos</label>
              <input id="emailInput" ref="emailInput" type="email"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]"
                placeholder="Alamat lengkap kos" />
              <i class="fas fa-map-marker-alt absolute right-0 top-[50%] transform -translate-y-1/2 mr-2"></i>
            </div>
            <div class="w-[571px] h-[90px] left-0 top-[500px] absolute" id="NomorTeleponInput">
              <label for="buktiKepemilikanInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal"
                @click="focusBuktiKepemilikanInput">Foto Bukti Kepemilikan</label>
              <input id="buktiKepemilikanInput" ref="buktiKepemilikanInput" type="file" accept="image/*"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]" />
              <i class="fas fa-file-alt absolute right-0 top-[50%] transform -translate-y-1/2 mr-2"></i>
            </div>
            <div class="w-[571px] h-[90px] left-0 top-[610px] absolute" id="FotoKTPInput">
              <label for="fotoktpInput"
                class="left-0 top-0 absolute text-neutral-500 text-xl font-medium font-sans leading-normal"
                @click="focusFotoKTPInput">Foto KTP</label>
              <input id="fotoktpInput" ref="fotoktpInput" type="file" accept="image/*"
                class="left-[1px] top-[60px] absolute text-black text-opacity-80 text-lg font-semibold font-sans leading-tight outline-none border-b border-black w-[570px]" />
              <i class="fas fa-id-card absolute right-0 top-[50%] transform -translate-y-1/2 mr-2"></i>
            </div>
            <div class="w-[202px] h-[54px] left-[369px] top-[730px] absolute">
              <router-link to="/login">
                <div
                  class="w-[202px] h-[54px] left-0 top-0 absolute rounded-[5px] border-2 border-sky-300 hover:border-sky-400 transition duration-300"
                  style="border-width: 4px;"></div>
                <div class="left-[73px] top-[13px] absolute text-black text-lg font-bold font-sans hover:text-sky-600">Login
                </div>
              </router-link>
            </div>
            <router-link to="/home">
              <button
                class="w-[266px] h-[54px] left-0 top-[730px] absolute transition duration-300 ease-in-out transform hover:scale-105"
                id="btn-signUp" @click="signUp">
                <div class="w-[266px] h-[54px] left-0 top-0 absolute bg-gradient-to-r from-sky-300 to-blue-500 shadow">
                </div>
                <div class="w-[49px] h-[0px] left-[197px] top-[3px] absolute origin-top-left rotate-90 border border-white">
                </div>
                <div class="left-[65px] top-[15px] absolute text-white text-xl font-bold font-sans">Register</div>
                <div class="w-6 h-6 left-[220px] top-[15px] absolute flex items-center justify-center">
                  <i class="fas fa-chevron-right text-white"></i>
                </div>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import imagePath from '@/assets/images/bg-loginPage.png';
  import imageLogo from '@/assets/images/nearus.png';
  
  export default {
    data() {
      return {
        imagePath: imagePath,
        imageLogo: imageLogo,
        rememberMe: false,
        passwordVisible: false
      };
    },
    methods: {
      focusEmailInput() {
        this.$refs.emailInput.focus();
      },
      signUp() {
        console.log('Sign Up clicked');
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
  