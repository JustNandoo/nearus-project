<template>
  <div class="flex flex-col justify-between min-h-screen bg-white">
    <Nav />
    <div class="flex justify-center items-center">
      <div class="w-[523px] h-[500px] relative mb-20" style="top: 130px;">
        <!-- Your existing content -->
        <div class="text-black text-3xl font-semibold font-montserrat absolute top-0 left-[1px] flex items-center">
          <i class="fas fa-arrow-left mr-5 cursor-pointer" @click="goBack"></i> Pesan Kamar
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
          {{ roomData.roomName }} - {{ produk.name }}
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

        <div class="absolute left-0 top-[296px] w-[516px] h-[0px] border border-slate-400/opacity-60"></div>
        <div class="absolute left-[2px] top-[320px] flex items-center">
          <i class="fas fa-check-circle text-green-500 mr-1"></i>
          <span class="text-black text-xs font-normal font-montserrat leading-7">Tersedia</span>
        </div>
        <div class="text-slate-400/opacity-60 text-sm font-semibold font-montserrat absolute left-0 top-[350px]">
          Total
        </div>
        <div class="absolute left-[263px] top-[380px] w-[260px] h-[55px] bg-sky-600 rounded-[10px] shadow justify-center items-center inline-flex cursor-pointer" @click="processPayment">
          <div class="text-white text-lg font-semibold font-montserrat text-center">Bayar</div>
        </div>
        <div class="absolute left-0 top-[380px] text-black text-xl font-semibold font-montserrat">
          Rp. {{ roomData.price }}
        </div>
        <img
            class="absolute left-[350px] top-[183px] w-[192px] h-[101px] rounded-lg object-cover shadow-lg"
            :src="roomData.image || 'https://via.placeholder.com/192x101'"
            alt="Room Image"
        />
      </div>
      <div class="w-[530px] h-[450px] relative left-[80px]" style="top: 90px;">
        <div class="w-[218px] h-7 left-0 top-0 absolute text-black text-2xl font-semibold font-montserrat leading-7">
          Data Penghuni
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[54px] absolute text-black text-[13px] font-normal font-montserrat leading-7">
          {{ user.name }}
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[81px] absolute text-black text-[13px] font-normal font-montserrat leading-7">
          {{ user.phone }}
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
    <ConfirmationPopup
        :visible="showPopup"
        title="Confirm Navigation"
        message="Are you sure you want to cancel? All unsaved changes will be lost."
        @confirm="handleConfirm"
        @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Footer from "@/components/Pages/Footer.vue";
import Nav from "@/components/Pages/Nav.vue";
import ConfirmationPopup from "@/components/Payment/CancelPopUp.vue";
import axios from "axios";

const router = useRouter();
const store = useStore();
const showPopup = ref(false);
const isEditing = ref(false);
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const roomData = JSON.parse(localStorage.getItem('roomData')) || {
  roomName: 'Kamar Test',
  productName: 'Produk Test',
  price: 'Rp 7.200.000/6bln',
  image: 'https://via.placeholder.com/192x101'
};
const produk = JSON.parse(localStorage.getItem('produk'));

const user = computed(() => store.getters.getUser);

const formattedDate = computed(() => new Date(selectedDate.value).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }));

const goBack = () => {
  showPopup.value = true;
};

const handleConfirm = () => {
  showPopup.value = false;
  router.go(-1);
};

const handleCancel = () => {
  showPopup.value = false;
};

const toggleEditing = () => {
  isEditing.value = !isEditing.value;
};

const processPayment = async () => {
  try {
    const formattedDateValue = new Date(selectedDate.value).toISOString().split('T')[0];
    console.log('Payment request data:', {
      name: user.value.name,
      phonenumber: user.value.phonenumber,
      ownerId: roomData.ownerId,
      detail: `${roomData.roomName} - ${produk.name}`,
      duration: formattedDateValue,
      price: roomData.price,
      image: roomData.image,
      location: produk.location,
      fasilitas: roomData.fasilitas,
    });

    const response = await axios.post('https://api.nearus.id/api/checkout', {
      name: user.value.name,
      phonenumber: user.value.phonenumber,
      ownerId: roomData.ownerId,
      detail: `${roomData.roomName} - ${produk.name}`,
      duration: formattedDateValue,
      price: roomData.price,
      image: roomData.image,
      fasilitas: roomData.fasilitas,
      location: produk.location
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
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>