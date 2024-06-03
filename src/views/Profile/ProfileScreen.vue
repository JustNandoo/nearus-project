<template>
  <div class="flex flex-col pb-14 bg-white">
    <Nav />
    <main class="flex flex-col self-center px-5 mt-12 max-w-full w-[1208px] max-md:mt-10">
      <h2 class="text-3xl font-bold text-black max-md:max-w-full">Pengaturan</h2>
      <section class="mt-16 max-md:mt-10 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col max-md:gap-0">
          <SelectionProfile />
          <section class="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
            <h3 class="text-3xl font-semibold text-black max-md:max-w-full">Ubah Data Profil</h3>
            <div class="flex overflow-hidden relative flex-col items-end px-16 pt-20 pb-2 mt-11 ml-4 w-36 max-w-full rounded-full aspect-square max-md:pl-5 max-md:mt-10 max-md:ml-2.5">
              <img loading="lazy" src="@/assets/images/profile-pic.png" alt="Profile Picture" />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/489b933a-693d-460e-b794-6859ef5bb1d0?apiKey=dbb585655fed49b6b0cf3f986b221850&" class="mt-6 w-full bg-sky-600 rounded-full aspect-square h-[31px]" alt="Edit Icon" />
            </div>
            <form class="mt-11 max-md:mt-10 max-md:max-w-full">
              <label for="fullName" class="sr-only">Nama Lengkap Sesuai KTP</label>
              <p id="fullName" class="justify-center items-start px-4 py-5 mt-6 text-xl font-medium text-black rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                Username
              </p>
              <label for="phoneNumber" class="sr-only">Nomor Telepon</label>
              <p id="phoneNumber" class="justify-center items-start px-4 py-6 mt-6 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                +62895326362332
              </p>
              <label for="emailAddress" class="sr-only">Email</label>
              <p id="emailAddress" class="justify-center items-start px-4 py-5 mt-7 text-xl font-medium text-black whitespace-nowrap rounded-xl border border-solid border-black border-opacity-60 max-md:pr-5 max-md:max-w-full">
                user@gmail.com
              </p>
              <button type="submit" class="justify-center items-center px-16 py-5 mt-16 text-2xl font-semibold text-white bg-sky-600 rounded-xl max-md:px-5 max-md:mt-10 max-md:max-w-full">Ubah Data</button>
            </form>
          </section>
        </div>
      </section>
    </main>
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
