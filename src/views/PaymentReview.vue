<template>
    <div class="flex flex-col justify-between min-h-screen bg-white">
        <Nav />
        <div class="flex justify-center items-center">
            <div class="w-[523px] h-[480px] relative mb-20" style="top: 130px;">
                <div class="text-black text-3xl font-semibold font-montserrat absolute top-0 left-[1px] flex items-center">
                    <i class="fas fa-arrow-left mr-5"></i> Pesan Kamar
                </div>

                <div class="text-black text-2xl font-semibold font-montserrat absolute left-[1px] top-[85px]">
                    Pesanan
                </div>
                <div class="text-black text-sm font-semibold font-montserrat absolute left-[1px] top-[47px]">
                    Silahkan Cek Kembali data anda
                </div>
                <div class="text-black text-sm font-semibold font-montserrat absolute left-[1px] top-[183px]">
                    Kamar kamu
                </div>
                <div class="text-black text-sm font-semibold font-montserrat absolute left-[1px] top-[308px]">
                    Berong Kost 2
                </div>
                <div class="text-black text-sm font-normal font-montserrat absolute left-[1px] top-[228px]">
                    Kamar No. 1
                </div>

                <div class="relative">
                    <div class="absolute left-[2px] top-[125px] flex items-center">
                        <i class="far fa-calendar-alt text-black mr-1 absolute top-0"></i>
                    </div>
                    <div class="text-black text-[13px] font-normal font-montserrat absolute left-[28px] top-[125px]">
                        24 April 2024 - Belum Tahu
                    </div>
                </div>
                <div class="absolute left-[216px] top-[125px] w-7 h-[23px]">
                    <div class="text-black text-[15px] font-normal font-montserrat absolute left-0 top-0">
                        ubah
                    </div>
                    <div class="absolute left-0 top-[21px] w-10 h-[0px] border border-black"></div>
                </div>

                <div class="absolute left-0 top-[171px] w-[516px] h-[0px] border border-slate-400/opacity-60"></div>
                <div class="absolute left-0 top-[296px] w-[516px] h-[0px] border border-slate-400/opacity-60"></div>
                <div class="absolute left-0 top-[348px] w-[516px] h-[0px] border border-slate-400/opacity-60"></div>
                <div class="absolute left-0 top-[394px] w-[516px] h-[0px] border border-slate-400/opacity-60"></div>

                <div class="absolute left-[2px] top-[358px] flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-1"></i>
                    <span class="text-black text-xs font-normal font-montserrat leading-7">Tersedia</span>
                </div>
                <div class="text-slate-400/opacity-60 text-sm font-semibold font-montserrat absolute left-0 top-[407px]">
                    Total
                </div>
                <div class="absolute left-[263px] top-[425px] w-[260px] h-[55px] bg-sky-600 rounded-[10px] shadow justify-center items-center inline-flex">
                    <div class="text-white text-lg font-semibold font-montserrat text-center">Bayar</div>
                </div>
                <div class="absolute left-0 top-[446px] text-black text-xl font-semibold font-montserrat">
                    Rp 7.200.000/6bln
                </div>
                <img class="absolute left-[321px] top-[183px] w-48 h-[101px] rounded-lg"
                    src="https://via.placeholder.com/192x101" alt="Placeholder image">
            </div>
            <div class="w-[530px] h-[450px] relative left-[80px]" style="top: 90px;">
                <div
                    class="w-[218px] h-7 left-0 top-0 absolute text-black text-2xl font-semibold font-['Montserrat'] leading-7">
                    Data Penghuni
                </div>
                <div
                    class="w-[185px] h-[23px] left-0 top-[54px] absolute text-black text-[13px] font-normal font-['Montserrat'] leading-7">
                    Acaryanandana Alif Fajar
                </div>
                <div
                    class="w-[185px] h-[23px] left-0 top-[81px] absolute text-black text-[13px] font-normal font-['Montserrat'] leading-7">
                    +6281380895499
                </div>
                <div
                    class="w-[185px] h-[23px] left-0 top-[108px] absolute text-black text-[13px] font-normal font-['Montserrat'] underline leading-7">
                    nandoaja0310@gmail.com
                </div>
                <div class="border-b border-slate-400/opacity-90 absolute left-0 top-[150px] w-full"></div>

                <div class="absolute left-[1px] top-[157px] flex items-center">
                    <i class="far fa-file-alt text-black mr-3"></i>
                    <span class="text-black text-[13px] font-normal font-montserrat leading-7">Tagihan akan dikirimkan ke
                        kontak di atas</span>
                </div>

                <div class="absolute left-[1px] top-[187px] flex items-center">
                    <i class="far fa-id-card text-black mr-2"></i>
                    <span class="text-black text-[13px] font-normal font-montserrat leading-7">Siapkan kartu identitas asli
                        (KTP/KITAS) pada saat check-in untuk keperluan verifikasi</span>
                </div>

                <div class="absolute left-[1px] top-[240px] flex items-center">
                    <i class="fas fa-times text-black mr-3"></i>
                    <span class="text-black text-[13px] font-normal font-montserrat leading-7">Tidak dapat melakukanpembatalan
                        setelah membayar</span>
                </div>
            </div>
        </div>
        <Footer /> 
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Nav,
    Footer
  },
}
</script>

<style scoped>
.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-poppins {
    font-family: 'Poppins', sans-serif;
}
</style>
