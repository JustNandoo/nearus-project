<template>
    <div class="flex flex-col justify-between min-h-screen bg-white">
        <Nav />
        <div class="flex justify-center items-center">

            <div class="w-[523px] h-[480px] relative mb-20" style="top: 130px;">
                <div
                    class="text-black text-3xl font-semibold font-montserrat absolute top-0 left-[1px] flex items-center">
                    <i class="fas fa-arrow-left mr-5"></i> Pesan Kamar
                </div>
                <div class="text-black text-sm font-semibold font-montserrat absolute left-[1px] top-[47px]">
                    Pesanan anda telah berhasil dilakukan
                </div>
                <div class="w-[494.62px] h-[256.95px] relative left-[1px] top-[80px]">
                    <div class="w-60 h-7 absolute text-black text-2xl font-bold font-montserrat leading-7">Pesanan
                        Berhasil !</div>
                    <div
                        class="w-[494.62px] h-[30px] absolute top-[67px] flex justify-start items-start gap-[26.65px] inline-flex">
                        <div
                            class="grow shrink basis-0 text-neutral-500 text-[21.65px] font-normal font-montserrat leading-[29.98px]">
                            Ref Number</div>
                        <div
                            class="text-center text-neutral-900 text-[21.65px] font-medium font-montserrat leading-[29.98px]">
                          {{ paymentDetails.refnumber }}
                        </div>
                    </div>
                    <div
                        class="w-[494.62px] h-[30px] absolute top-[120.32px] flex justify-start items-start gap-[26.65px] inline-flex">
                        <div
                            class="grow shrink basis-0 text-neutral-500 text-[21.65px] font-normal font-montserrat leading-[29.98px]">
                            Payment Time</div>
                        <div
                            class="text-center text-neutral-900 text-[21.65px] font-medium font-montserrat leading-[29.98px]">
                          {{ paymentDetails.payment_time }}
                        </div>
                    </div>
                    <div
                        class="w-[494.62px] h-[30px] absolute top-[173.63px] flex justify-start items-start gap-[26.65px] inline-flex">
                        <div
                            class="grow shrink basis-0 text-neutral-500 text-[21.65px] font-normal font-montserrat leading-[29.98px]">
                          Payment Method
                        </div>
                        <div
                            class="text-center text-neutral-900 text-[21.65px] font-medium font-montserrat leading-[29.98px]">
                          {{ paymentDetails.payment_method }}</div>
                    </div>
                    <div
                        class="w-[494.62px] h-[30px] absolute top-[226.95px] flex justify-start items-start gap-[26.65px] inline-flex">
                        <div
                            class="grow shrink basis-0 text-neutral-500 text-[21.65px] font-normal font-montserrat leading-[29.98px]">
                            Sender Name</div>
                        <div
                            class="text-center text-neutral-900 text-[21.65px] font-medium font-montserrat leading-[29.98px]">
                            Edi Haryanto</div>
                    </div>
                </div>
            </div>


            <div class="w-[304px] h-[263px] relative">
                <div
                    class="w-[304px] h-[23px] left-[13px] bottom-[15px] absolute text-black text-sm font-normal font-montserrat leading-7 top-[250px]">
                    Scan QR untuk unduh bukti pembelian</div>
                <img class="w-[228px] h-[228px] left-[38px] top-[15px] absolute"
                    src="https://via.placeholder.com/228x228" />
            </div>


            <div class="w-[392px] h-[300px] relative">
                <div class="w-8 h-8 absolute left-[145px] top-[150px]">
                    <i class="fas fa-check-circle text-green-500 mr-1 text-9xl"></i>
                </div>
                <div
                    class="w-60 h-7 left-[90px] top-[11px] absolute text-black text-2xl font-bold font-montserrat leading-7">
                    Transaksi Selesai !!</div>
                <div
                    class="w-[304px] h-[23px] left-[60px] top-[58px] absolute text-black text-sm font-normal font-montserrat leading-7">
                    Terima Kasih telah Menyewa kos di NeaRuS</div>
                <div
                    class="w-[372px] h-[23px] left-[20px] top-[328px] absolute text-black text-sm font-normal font-montserrat leading-7">
                    Silahkan, anda bisa mengatur pembayaran kos anda</div>
                <div
                    class="w-[446px] h-[0px] left-0 top-0 absolute origin-top-left rotate-90 border border-slate-400/opacity-60">
                </div>
                <router-link to="/home">
                    <div
                        class="w-[375px] h-[55px] pl-[70px] pr-[72px] pt-[17px] pb-[21px] left-[20px] top-[370px] absolute bg-sky-600 rounded-[10px] shadow justify-center items-center inline-flex cursor-pointer">
                        <div class="text-center text-white text-sm font-semibold font-montserrat">NeaRuS Finance</div>
                    </div>
                </router-link>

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
  data() {
    return {
      paymentDetails: {}
    };
  },
  mounted() {
    const storedPaymentDetails = localStorage.getItem('paymentDetails');
    if (storedPaymentDetails) {
      this.paymentDetails = JSON.parse(storedPaymentDetails);
    }
  }
};
</script>

<style scoped>
.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-poppins {
    font-family: 'Poppins', sans-serif;
}
</style>