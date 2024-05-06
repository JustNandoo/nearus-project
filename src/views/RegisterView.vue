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
          <div class="w-[172px] h-[49px] left-0 top-[36px] absolute">
            <img class="left-0 top-0 absolute" :src="imageLogo" />
            <div class="w-4 h-4 left-[118px] top-[1px] absolute"></div>
            <div class="w-2 h-[8.17px] left-[137px] top-[5.87px] absolute bg-sky-600 rounded-full"></div>
          </div>
          <div
            class="w-[483px] left-0 top-[117px] absolute text-black text-[34px] font-bold font-sans leading-[41.48px] tracking-wide">
            Selamat Datang, Silahkan Daftar untuk lanjut</div>
          <div>
            <div class="w-[673px] h-[171px] top-[250px] relative" id="card-pengguna">
              <router-link to="/user-register">
                <button
                  class="w-[673px] h-[168px] left-0 top-[3px] absolute bg-white rounded-[10px] shadow border border-stone-300 transition duration-300 ease-in-out transform hover:border-blue-500 hover:shadow-lg hover:scale-105 active:border-2 active:border-blue-500 active:shadow-xl">
                  <div class="w-[91.61px] h-[85.50px] left-[36px] top-[43.77px] absolute">
                    <img :src="imagePengguna" alt="Gambar Pengguna" class="w-[91.61px] h-[85.50px]">
                    <div class="w-[53.56px] h-[51.30px] left-[18.74px] top-[21.05px] absolute"></div>
                  </div>
                  <div class="h-[78px] left-[159px] top-[52px] absolute flex flex-col justify-start">
                    <div class="text-black text-[25px] font-semibold font-montserrat leading-[34.75px] text-left"
                      id="judul">Pengguna</div>
                    <div class="text-slate-400 text-lg font-normal font-montserrat leading-tight text-left"
                      id="deskripsi">untuk anda yang ingin mendaftarkan usaha kalian disekitar RUS.</div>
                  </div>
                </button>
              </router-link>
            </div>
            <div class="w-[673px] h-[171px] top-[320px] relative" id="card-mitra">
              <router-link to="/mitra-register">
                <button
                  class="w-[673px] h-[168px] left-0 top-[3px] absolute bg-white rounded-[10px] shadow border border-stone-300 transition duration-300 ease-in-out transform hover:border-blue-500 hover:shadow-lg hover:scale-105 active:border-2 active:border-blue-500 active:shadow-xl">
                  <div class="w-[91.61px] h-[85.50px] left-[36px] top-[43.77px] absolute">
                    <img :src="imageKemitraan" alt="Gambar Kemitraan" class="w-[91.61px] h-[85.50px]">
                    <div class="w-[53.56px] h-[51.30px] left-[18.74px] top-[21.05px] absolute"></div>
                  </div>
                  <div class="h-[78px] left-[159px] top-[52px] absolute flex flex-col justify-start">
                    <div class="text-black text-[25px] font-semibold font-montserrat leading-[34.75px] text-left"
                      id="judul">Kemitraan</div>
                    <div class="text-slate-400 text-lg font-normal font-montserrat leading-tight text-left"
                      id="deskripsi">untuk anda yang ingin mendaftarkan usaha kalian disekitar RUS.</div>
                  </div>
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagePath: '../src/assets/images/bg-loginPage.png',
      imagePengguna: '../src/assets/images/pengguna.png',
      imageKemitraan: '../src/assets/images/kemitraan.png',
      imageLogo:'../src/assets/images/nearus.png',
    };
  },
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