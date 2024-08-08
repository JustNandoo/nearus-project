<template>
  <div class="relative w-[1557px] h-[1466px]">
    <!-- Main Image -->
    <img
        class="w-[991px] h-[640px] absolute top-[200px] left-[298px] rounded-lg object-cover shadow-lg"
        src="https://via.placeholder.com/991x640"
        alt="Main Image"
    />

    <!-- Back Button -->
    <div class="absolute top-[20px] left-[78px] text-black text-3xl font-semibold font-montserrat leading-7">
      Kembali
    </div>

    <!-- Room Name -->
    <div class="absolute top-[883px] left-[697px] text-black text-[32px] font-semibold font-montserrat leading-7">
      Kamar 10
    </div>

    <!-- Room Location -->
    <div class="absolute top-[119px] left-[625px] text-black text-[32px] font-semibold font-montserrat leading-7">
      Berong Kos 2 Kudus
    </div>

    <!-- Divider Lines -->
    <div class="absolute top-[964px] left-[45px] w-[1512px] border border-[#939393]/40"></div>
    <div class="absolute top-[1158px] left-[38px] w-[1512px] border border-[#939393]/40"></div>
    <div class="absolute top-[1350px] left-[38px] w-[1512px] border border-[#939393]/40"></div>
    <div class="absolute top-[1159px] left-[833px] w-[193px] origin-top-left -rotate-90 border border-[#939393]/40"></div>
    <div class="absolute top-[1351px] left-[833px] w-[193px] origin-top-left -rotate-90 border border-[#939393]/40"></div>

    <!-- Owner Info -->
    <div class="absolute top-[1016px] left-[77px] flex items-center">
      <div class="text-black text-[28px] font-medium font-montserrat leading-7">
        Kos disewakan oleh Pak Anwari
      </div>
      <img
          class="w-[94px] h-[94px] rounded-full ml-4"
          src="https://via.placeholder.com/94x94"
          alt="Owner Image"
      />
    </div>

    <!-- Contact Info -->
    <div class="absolute top-[1011px] left-[1017px] text-black text-xl font-light font-montserrat leading-7">
      Nomor Telepon: 0813-2828-2288
    </div>
    <div class="absolute top-[1087px] left-[1017px] text-black text-xl font-light font-montserrat leading-7">
      Email: pakanwari@gmail.com
    </div>

    <!-- Action Buttons -->
    <div class="absolute top-[1246px] left-[294px] bg-[#008dda] text-white text-base font-semibold font-montserrat rounded-lg shadow-lg p-4 flex justify-center items-center">
      <div>Perpanjang</div>
    </div>

    <div class="absolute top-[1246px] left-[962px] bg-white border-2 border-[#38a1ff] rounded-lg flex items-center p-4">
      <div class="text-[#38a1ff] text-[15px] font-bold font-montserrat leading-7">
        Whatsapp
      </div>
      <img
          class="w-[52px] h-[52px] rounded-full border-2 border-[#008dda] ml-2"
          src="https://via.placeholder.com/52x52"
          alt="WhatsApp Icon"
      />
    </div>

    <div class="absolute top-[1398px] left-[704px] bg-white border-2 border-[#38a1ff] rounded-lg flex items-center p-4">
      <div class="text-[#38a1ff] text-[15px] font-bold font-montserrat leading-7">
        Ajukan Pembatalan
      </div>
    </div>

    <!-- Payment Status -->
    <div class="absolute top-[1193px] left-[193px] text-black text-[28px] font-medium font-montserrat leading-7">
      Kos telah dibayar selama 6 bulan
    </div>

    <div class="absolute top-[1188px] left-[1107px] text-black text-[28px] font-medium font-montserrat leading-7">
      Kontak Pemilik
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}
</style>
