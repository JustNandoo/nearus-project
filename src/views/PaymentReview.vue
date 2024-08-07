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
        <div class="text-black text-sm font-normal font-montserrat absolute left-[1px] top-[228px]">
          {{ roomData.roomName }} - {{ roomData.productName }}
        </div>

        <div class="relative">
          <div class="absolute left-[2px] top-[125px] flex items-center">
            <i class="far fa-calendar-alt text-black mr-1 absolute top-0"></i>
          </div>
          <div v-if="!isEditing" class="text-black text-[13px] font-normal font-montserrat absolute left-[28px] top-[125px]">
            {{ formattedDate }}
          </div>
          <input v-else type="date" v-model="selectedDate" class="text-black text-[13px] font-normal font-montserrat absolute left-[28px] top-[125px] outline" />
        </div>
        <div class="absolute left-[160px] top-[125px] w-7 h-[23px]">
          <div @click="toggleEditing" class="text-black text-[15px] font-normal font-montserrat absolute left-0 top-0 cursor-pointer">
            {{ isEditing ? 'Simpan' : 'Ubah' }}
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
        <div class="absolute left-[263px] top-[425px] w-[260px] h-[55px] bg-sky-600 rounded-[10px] shadow justify-center items-center inline-flex cursor-pointer" @click="processPayment">
          <div class="text-white text-lg font-semibold font-montserrat text-center">Bayar</div>
        </div>

        <div class="absolute left-0 top-[446px] text-black text-xl font-semibold font-montserrat">
          {{ roomData.price }}
        </div>
        <img class="absolute left-[321px] top-[183px] w-48 h-[101px] rounded-lg" :src="roomData.image" alt="Room Image">
      </div>
      <div class="w-[530px] h-[450px] relative left-[80px]" style="top: 90px;">
        <div class="w-[218px] h-7 left-0 top-0 absolute text-black text-2xl font-semibold font-montserrat leading-7">
          Data Penghuni
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[54px] absolute text-black text-[13px] font-normal font-montserrat leading-7">
          {{ user.name }}
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[81px] absolute text-black text-[13px] font-normal font-montserrat leading-7">
          {{ user.phonenumber }}
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[108px] absolute text-black text-[13px] font-normal font-montserrat underline leading-7">
          {{ user.email }}
        </div>
        <div class="border-b border-slate-400/opacity-90 absolute left-0 top-[150px] w-full"></div>

        <div class="absolute left-[1px] top-[157px] flex items-center">
          <i class="far fa-file-alt text-black mr-3"></i>
          <span class="text-black text-[13px] font-normal font-montserrat leading-7">Tagihan akan dikirimkan ke kontak di atas</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Nav from "@/components/Nav.vue";
import axios from "axios";
import { mapGetters } from 'vuex';
import router from "@/router/index.js";

export default {
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      isEditing: false,
      selectedDate: new Date().toISOString().split('T')[0],
      roomData: JSON.parse(localStorage.getItem('roomData')) || {
        roomName: 'Kamar Test',
        productName: 'Produk Test',
        price: 'Rp 7.200.000/6bln',
        image: 'https://via.placeholder.com/192x101'
      }
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser;
    },
    formattedDate() {
      return new Date(this.selectedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  },
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    async processPayment() {
      try {
        const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
        console.log('Payment request data:', {
          name: this.user.name,
          phonenumber: this.user.phonenumber,
          ownerId: 1, // This should be updated to the actual ownerId if needed
          detail: `${this.roomData.roomName} - ${this.roomData.productName}`,
          duration: formattedDate,
          price: this.roomData.price
        });

        const response = await axios.post('https://api.nearus.id/api/checkout', {
          name: this.user.name,
          phonenumber: this.user.phonenumber,
          ownerId: 1,
          detail: `${this.roomData.roomName} - ${this.roomData.productName}`,
          duration: formattedDate,
          price: this.roomData.price
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.data.success) {
          const snapToken = response.data.snapToken;
          window.snap.pay(snapToken, {
            onSuccess: (result) => {
              console.log('Payment Result:', {
                refnumber: response.data.refnumber,
                payment_time: result.transaction_time,
                payment_method: result.payment_type.toUpperCase()
              });
              localStorage.setItem('paymentDetails', JSON.stringify({
                refnumber: response.data.refnumber,
                payment_time: result.transaction_time,
                payment_method: result.payment_type.toUpperCase()
              }));
              router.push('/PaymentPage');
            },
            onPending: (result) => {
              alert("Waiting for your payment!");
              console.log(result);
            },
            onError: (result) => {
              alert("Payment failed!");
              console.log(result);
            },
            onClose: () => {
              alert('You closed the popup');
            }
          });
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        alert('An error occurred during payment processing.');
      }
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
