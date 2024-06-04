<template>
  <div class="flex flex-col bg-white">
   <Nav />
    <main class="flex flex-col items-end self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <h1 class="self-stretch text-3xl font-bold text-black max-md:max-w-full">Pengaturan</h1>
      <section class="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
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
  </div>
  <FooterComponent/>
</template>

<script>
import Nav from '@/components/Nav.vue';
import FooterComponent from "@/components/Footer.vue";
export default {
  components: {
    Nav,
    FooterComponent
  },
}
</script>


