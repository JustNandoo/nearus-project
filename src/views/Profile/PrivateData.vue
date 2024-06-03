<template>
  <div class="flex flex-col bg-white">
    <Nav />
    <main class="flex flex-col items-end self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <h1 class="self-stretch text-3xl font-bold text-black max-md:max-w-full">Pengaturan</h1>
      <section class="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <SelectionProfile />
          <section class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <div class="flex flex-col grow mt-5 text-2xl text-black max-md:mt-10 max-md:max-w-full">
              <h2 class="text-3xl font-semibold max-md:max-w-full">Data Pribadi</h2>
              <div class="flex gap-5 items-start px-5 py-3.5 mt-14 rounded-xl border border-solid border-black border-opacity-60 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <label for="jenisKelamin" class="flex-auto my-auto">Jenis Kelamin</label>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/92838e0ed761378eb424122562bf69cbbc20f18dd9b0b2b636cc6771d1cec331?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Jenis Kelamin Icon" class="shrink-0 self-start w-12 aspect-square" />
              </div>
              <div class="flex gap-5 px-6 py-5 mt-12 rounded-xl border border-solid border-black border-opacity-60 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <label for="tanggalLahir" class="flex-auto">Tanggal Lahir</label>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0653a19a28ac99459bfe7bd60c77209397a5ab48eecd9c5e71f2d81fe2e903a0?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Tanggal Lahir Icon" class="shrink-0 aspect-square w-[31px]" />
              </div>
              <input 
                type="text" 
                name="alamatRumah" 
                id="alamatRumah" 
                placeholder="Alamat Rumah" 
                class="justify-center items-start px-6 py-7 mt-12 rounded-xl border border-solid border-black border-opacity-60 max-md:px-5 max-md:mt-10 max-md:max-w-full"
              />
              <h2 class="mt-16 text-3xl font-semibold max-md:mt-10 max-md:max-w-full">Kontak Darurat</h2>
            </div>
          </section>
        </div>
      </section>
      <form class="justify-center items-start px-6 py-7 mt-16 max-w-full text-2xl text-black rounded-xl border border-solid border-black border-opacity-60 w-[711px] max-md:px-5 max-md:mt-10">
        <label for="namaPanjang" class="sr-only">Nama Panjang</label>
        <input type="text" id="namaPanjang" class="self-stretch" placeholder="Nama Panjang" />
      </form>
      <div class="flex gap-5 justify-between px-5 py-3.5 mt-11 max-w-full text-2xl text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 w-[711px] max-md:flex-wrap max-md:mt-10">
        <div class="my-auto">Status</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/92838e0ed761378eb424122562bf69cbbc20f18dd9b0b2b636cc6771d1cec331?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Status Icon" class="shrink-0 w-12 aspect-square" />
      </div>
      <div class="flex gap-5 mt-11 max-w-full text-2xl text-black w-[711px] max-md:flex-wrap max-md:mt-10">
        <div class="shrink-0 max-w-full border border-solid aspect-[1.67] border-black border-opacity-60 w-[122px] flex items-center justify-center">
        +62
        </div>  
        <input 
          type="tel" 
          name="nomorTelepon" 
          id="nomorTelepon" 
          placeholder="Nomor Telepon" 
          class="grow justify-center items-start px-7 py-7 rounded-xl border border-solid border-black border-opacity-60 w-fit max-md:px-5 max-md:max-w-full"
        />
      </div>
      <button class="justify-center items-center px-16 py-4 mt-16 max-w-full text-2xl font-semibold text-white whitespace-nowrap bg-sky-600 rounded-xl w-[711px] max-md:px-5 max-md:mt-10">
        Simpan
      </button>
    </main>
    <footer class="flex flex-col px-9 py-9 mt-36 w-full bg-blue-600 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div class="text-5xl font-bold text-white tracking-[2.58px] max-md:max-w-full">NeaR<span class="text-3xl tracking-widest">U</span>S</div>
      <div class="shrink-0 mt-9 h-px bg-white border border-white border-solid max-md:max-w-full"></div>
      <div class="flex gap-5 justify-between items-start mt-7 max-w-full w-[875px] max-md:flex-wrap">
        <address class="flex flex-col text-base">
          <p class="text-center leading-[187%] text-white text-opacity-80">lokasi</p>
          <p class="mt-6 font-medium leading-7 text-white">
            Jalan Sukun Raya No.09, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333
          </p>
        </address>
        <section class="flex flex-col self-stretch text-base leading-7 text-center text-white">
          <p class="text-white text-opacity-80">Hubungi kami</p>
          <div class="flex gap-3 mt-4">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9185d01cce8d13478be0b03f7ae3512f1d0082f87584a64ca56ad1eea1f1541?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Phone Icon" class="shrink-0 aspect-[0.53] w-[9px]" />
            <p class="flex-auto my-auto">+62 895-3263-62332</p>
          </div>
          <div class="flex gap-3 mt-4 whitespace-nowrap">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d89cd4a6313cce2b3f61f48263843c62aff1ec3a698e2e287f372105def83184?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Email Icon" class="shrink-0 self-start w-3.5 aspect-[1.41]" />
            <p class="flex-auto">nearuswebsite@gmail.com</p>
          </div>
        </section>
        <section class="flex flex-col">
          <p class="text-base leading-7 text-center text-white text-opacity-80">Ikuti kami</p>
          <div class="flex gap-3 mt-3.5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0f6402df434ac3595b7f586831e2166284c3dbc68d50c37fc4d03f61e1023ab?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Social Icon 1" class="shrink-0 aspect-square w-[26px]" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c15ab3ad451b5d26f24a03617bfe25c76a31f35fd4908d51f20578d5c575c662?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Social Icon 2" class="shrink-0 aspect-square w-[26px]" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2216b91deae853ce362620306551a8cde419995b1c811cc0384235c63e07cffe?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Social Icon 3" class="shrink-0 aspect-square w-[26px]" />
          </div>
        </section>
      </div>
      <p class="mt-14 text-xl leading-7 text-center text-white max-md:mt-10 max-md:max-w-full">© 2024 NeaRus. all right reserved</p>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/20bd2017f01357ed9c9c0f73929938aa95fa737320e644376351449986605ae9?apiKey=dbb585655fed49b6b0cf3f986b221850&" alt="Footer Image" class="mt-11 w-full aspect-[11.11] max-md:mt-10 max-md:max-w-full" />
    </footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import SelectionProfile from '@/components/SelectionProfile.vue';

export default {
  components: {
    Nav,
    SelectionProfile,
  },
};
</script>
