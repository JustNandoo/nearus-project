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
        <img class="absolute left-[321px] top-[183px] w-48 h-[101px] rounded-lg" src="https://via.placeholder.com/192x101" alt="Placeholder image">
      </div>
      <div class="w-[530px] h-[450px] relative left-[80px]" style="top: 90px;">
        <div class="w-[218px] h-7 left-0 top-0 absolute text-black text-2xl font-semibold font-['Montserrat'] leading-7">
          Data Penghuni
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[54px] absolute text-black text-[13px] font-normal font-['Montserrat'] leading-7" >
          {{ user.name }}
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[81px] absolute text-black text-[13px] font-normal font-['Montserrat'] leading-7">
          {{ user.phonenumber }}
        </div>
        <div class="w-[185px] h-[23px] left-0 top-[108px] absolute text-black text-[13px] font-normal font-['Montserrat'] underline leading-7">
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
import router from "@/router/index.js";

export default {
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      isEditing: false,
      selectedDate: "2024-04-24",
      // Use dummy data for the user
      user: {
        name: 'John Doe',            // Dummy name
        phonenumber: '081234567890', // Dummy phone number
        email: 'johndoe@example.com' // Dummy email
      },
      roomData: {
        roomName: 'Kamar Test',
        productName: 'Produk Test',
        price: 'Rp 7.200.000/6bln'
      }
    };
  },
  computed: {
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
          ownerId: 1,
          detail: this.roomData.roomName + ' - ' + this.roomData.productName,
          duration: formattedDate,
          price: 100000
        });

        const response = await axios.post('https://api.nearus.id/api/checkout', {
          name: this.user.name,
          phonenumber: this.user.phonenumber,
          ownerId: 1,
          detail: this.roomData.roomName + ' - ' + this.roomData.productName,
          duration: formattedDate,
          price: 100000
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.data.success) {
          const snapToken = response.data.snapToken;
          window.snap.pay(snapToken, {
            onSuccess: function(result) {
              console.log('Payment Result:', {
                refnumber: response.data.refnumber,
                payment_time: result.transaction_time,
                payment_method: result.payment_type.toUpperCase()
              });
              router.push('/PaymentPage');
            },
            onPending: function(result) {
              alert("Waiting for your payment!");
              console.log(result);
            },
            onError: function(result) {
              alert("Payment failed!");
              console.log(result);
            },
            onClose: function() {
              alert('You closed the popup without finishing the payment');
            }
          });
        } else {
          console.error('Failed to create order');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        }
      }
    },
    loadSnapScript() {
      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', 'Mid-client-RgPSumJlMsThnpLo');
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Snap.js script loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load the Snap.js script');
      };
    }
  },
  mounted() {
    const storedRoomData = localStorage.getItem('roomData');
    if (storedRoomData) {
      this.roomData = JSON.parse(storedRoomData);
    }
    this.loadSnapScript();
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

.cursor-pointer {
  cursor: pointer;
}

.outline {
  outline: 2px solid #00f; /* Ubah warna outline sesuai kebutuhan */
}
</style>
