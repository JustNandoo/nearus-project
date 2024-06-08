<template>
  <div class="flex flex-col pb-14 bg-white">
    <NavFixed />
    <main class="flex flex-col self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <section class="mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <div class="w-[344px] h-[264px] relative">
            <SelectionProfile/>
          </div>
          <section class="flex flex-col w-[64%] max-md:ml-0 max-md:w-full">
            <div class="flex flex-col grow mt-5 text-2xl text-black max-md:mt-10 max-md:max-w-full">
              <h2 class="text-3xl font-semibold max-md:max-w-full">Ubah Kata Sandi</h2>
              <div class="mt-14 max-md:mt-10 max-md:max-w-full">
                <label for="current-password" class="label-field">Kata Sandi Saat Ini</label>
                <div class="flex gap-5 px-6 py-6 mt-7 input-field max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                  <div class="flex-auto my-auto" id="current-password">************</div>
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2d147b3ff3c76e96a2c1df7efd54d156801d5f9e1fa9490bfa811b5656f897b?apiKey=dbb585655fed49b6b0cf3f986b221850&" class="shrink-0 w-7 aspect-square" alt="" />
                </div>
              </div>
              <div class="mt-14 max-md:mt-10 max-md:max-w-full">
                <label for="new-password" class="label-field">Kata Sandi Baru</label>
                <div class="flex gap-5 px-6 py-6 mt-7 input-field max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                  <input type="password" id="new-password" class="flex-auto text-right" placeholder="Masukkan kata sandi baru Anda" aria-label="Masukkan kata sandi baru Anda" />
                </div>
              </div>
              <div class="mt-14 max-md:mt-10 max-md:max-w-full">
                <label for="confirm-password" class="label-field">Ulangi Kata Sandi Baru</label>
                <div class="flex gap-5 px-6 py-6 mt-7 input-field max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                  <input type="password" id="confirm-password" class="flex-auto text-right" placeholder="Ulangi kata sandi baru Anda" aria-label="Ulangi kata sandi baru Anda" />
                </div>
              </div>
              <div class="mt-14 max-md:mt-10 max-md:max-w-full">
                <div class="flex gap-5 mt-11 max-md:flex-wrap max-md:mt-10">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9dfd6f724ed46445f17a5c3462fc9f79ebfa27e8728351ae6e098e49ff399c79?apiKey=dbb585655fed49b6b0cf3f986b221850&" class="shrink-0 aspect-square w-[33px]" alt="" />
                  <div class="flex-auto my-auto">Minimal menggunakan 1 huruf kapital</div>
                </div>
                <div class="flex gap-5 mt-5 max-md:flex-wrap max-md:mt-10">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9dfd6f724ed46445f17a5c3462fc9f79ebfa27e8728351ae6e098e49ff399c79?apiKey=dbb585655fed49b6b0cf3f986b221850&" class="shrink-0 aspect-square w-[33px]" alt="" />
                  <div class="flex-auto my-auto">Minimal 8 karakter</div>
                </div>
                <div class="flex gap-5 mt-5 max-md:flex-wrap max-md:mt-10">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9dfd6f724ed46445f17a5c3462fc9f79ebfa27e8728351ae6e098e49ff399c79?apiKey=dbb585655fed49b6b0cf3f986b221850&" class="shrink-0 aspect-square w-[33px]" alt="" />
                  <div class="flex-auto my-auto max-md:max-w-full">Minimal menggunakan 1 simbol atau angka</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section class="mt-16 max-md:mt-10 max-md:max-w-full">
        <button
          class="justify-center items-center self-end px-16 py-4 mt-12 max-w-full text-2xl font-semibold text-white whitespace-nowrap bg-sky-600 rounded-xl w-full max-md:px-5 max-md:mt-10"
          tabindex="0"
          @click="savePassword">
          Simpan
        </button>
      </section>
    </main>
  </div>
  <Footer />
</template>

<script>
import { useStore } from 'vuex';
import NavFixed from "@/components/NavFixed.vue";
import SelectionCard from '@/components/SelectionProfile.vue';
import Footer from '@/components/Footer.vue';
import SelectionProfile from '@/components/SelectionProfile.vue';

export default {
  components: {
    SelectionCard,
    NavFixed,
    Footer,
    SelectionProfile
  },
  setup() {
    const store = useStore();

    const savePassword = () => {
      // Logika untuk menyimpan kata sandi baru
    };

    return {
      savePassword,
    };
  },
};
</script>

<style scoped>
.input-field {
  border: 1px solid #000;
  border-radius: 10px;
  overflow: hidden;
}

.input-field input[type="password"] {
  border: none;
  outline: none;
  flex: 1;
}

.label-field {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
