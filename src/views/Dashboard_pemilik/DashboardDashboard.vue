  <template>
    <div class="">
      <div class="flex">
        <sidebar/>
        <div class="ml-[350px] overflow-auto w-screen h-screen">
          <div class="flex flex-col">
            <div class="flex justify-between items-center w-[1500px] mx-10 mt-5 gap-2 h-10px">
              <h1 class="text-black font-medium text-[20px]">Dashboard</h1>
              <div class="rounded-full gap-5 flex items-center justify-center">
                <div class="flex items-center justify-center gap-3">
                  <img :src="profilePicture" alt="Profile Picture" class="object-cover rounded-full h-12 w-12">
                  <p class="text-xl font-medium text-black">
                    {{ userName }}
                  </p>
                </div>
              </div>
            </div>
            <div class="ml-10 mt-4 font-medium text-[22px]">
              Halo, {{userName}} apa rencanamu hari ini?
            </div>
            <div class="flex mt-8 mx-auto gap-8 relative">
              <div class="w-[350px] h-full mx-auto overflow-hidden rounded-lg shadow-lg">
                <div class="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
                  <div class="flex items-center gap-2">
                    <h1 class="text-white font-semibold text-[18px]">Pemasukan</h1>
                    <font-awesome-icon :icon="faArrowDown" class="text-white"/>
                  </div>
                  <p class="text-white mt-2 font-bold text-[20px]">{{ formattedBalance }}</p>
                </div>
              </div>
              <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
                <div class="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                  <div class="flex items-center gap-2">
                    <h1 class="text-white font-semibold text-[18px]">Total Jumlah Produk</h1>
                    <font-awesome-icon :icon="faDoorClosed" class="text-white"/>
                  </div>
                  <p class="text-white mt-2 font-bold text-[20px]">{{totalProducts}} Produk</p>
                </div>
              </div>
              <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg">
                <div class="relative bg-gradient-to-r from-green-500 to-teal-500 p-6">
                  <div class="flex items-center gap-2">
                    <h1 class="text-white font-semibold text-[18px]">Total Jumlah Penyewa Kost</h1>
                    <font-awesome-icon :icon="faUser" class="text-white"/>
                  </div>
                  <p class="text-white mt-2 font-bold text-[20px] ">{{totalTenants}} Penghuni</p>
                </div>
              </div>
              <div class="w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg relative">
                <div class="relative bg-gradient-to-r from-orange-500 to-yellow-500 p-6">
                  <div class="flex items-center gap-2">
                    <h1 class="text-white font-semibold text-[18px]">Sisa Saldo</h1>
                    <font-awesome-icon :icon="faMoneyBill" class="text-white"/>
                  </div>
                  <p class="text-white mt-2 font-bold text-[20px]">{{ formattedBalance }}</p>
                </div>
              </div>
              <button @click="openModal" class="absolute right-[0px] bottom-[-60px] bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg">
                Penarikan Dana
              </button>
            </div>
            <ChartStatistik/>
          </div>
        </div>
      </div>

      <!-- Modal Pengajuan Card -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-8 w-[400px]">
          <div class="flex flex-col items-center mb-6">
            <p class="text-sm font-semibold text-gray-600">Pilih Metode Penarikan</p>
          </div>

          <!-- Step 1: Choose Payment Method -->
          <div v-if="!selectedMethod" class="flex justify-between gap-4">
            <!-- E-Wallet Card -->
            <div @click="selectMethod('ewallet')" class="w-1/2 bg-white shadow-lg border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
              <i class="fas fa-wallet text-blue-500 text-3xl mb-2"></i>
              <span class="font-semibold text-center">E-Wallet</span>
            </div>

            <!-- Bank Card -->
            <div @click="selectMethod('bank')" class="w-1/2 bg-white shadow-lg border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
              <i class="fas fa-university text-green-500 text-3xl mb-2"></i>
              <span class="font-semibold text-center">Bank</span>
            </div>
          </div>

          <!-- Step 2: E-Wallet Form -->
          <div v-if="selectedMethod === 'ewallet'">
            <!-- E-Wallet Name Field -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1" for="ewallet-name">
                Nama E-Wallet <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-wallet absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                    id="ewallet-name"
                    type="text"
                    v-model="targetTransfer"
                    placeholder="Masukkan Nama E-Wallet"
                    class="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- E-Wallet Number Field -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1" for="ewallet-number">
                Nomor E-Wallet <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-phone-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                    id="ewallet-number"
                    type="text"
                    v-model="norekening"
                    placeholder="Masukkan Nomor Handphone"
                    class="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Withdrawal Amount Field -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1" for="withdraw-amount">
                Jumlah Penarikan <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-money-bill-wave absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                    id="withdraw-amount"
                    type="number"
                    v-model="withdrawAmount"
                    placeholder="Masukkan jumlah penarikan"
                    class="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-2">
              <button
                  @click="closeModal"
                  class="bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Batal
              </button>
              <button
                  @click="submitWithdrawalEwallet"
                  class="bg-blue-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tarik
              </button>
            </div>
          </div>


          <!-- Step 2: Bank Form -->
          <div v-if="selectedMethod === 'bank'">
            <!-- Bank Name Field -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1" for="bank-name">
                Nama Bank <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-university absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                    id="bank-name"
                    type="text"
                    v-model="targetTransfer"
                    placeholder="Masukkan Nama Bank"
                    class="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Bank Account Number Field -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1" for="bank-account-number">
                No Rekening <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-credit-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                    id="bank-account-number"
                    type="text"
                    v-model="norekening"
                    placeholder="Masukkan No Rekening"
                    class="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Withdrawal Amount Field -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1" for="withdraw-amount">
                Jumlah Penarikan <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-money-bill-wave absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                    id="withdraw-amount"
                    type="number"
                    v-model="withdrawAmount"
                    placeholder="Masukkan jumlah penarikan"
                    class="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-2">
              <button
                  @click="closeModal"
                  class="bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Batal
              </button>
              <button
                  @click="submitWithdrawalBank"
                  class="bg-blue-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tarik
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </template>

  <script setup>
  import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { faArrowDown, faMoneyBill, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
  import { onMounted, computed, ref } from "vue";
  import ChartStatistik from "@/components/DashboardPemilik/ChartStatistik.vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import { useToast } from 'vue-toastification';

  // Initialize Vuex store and router
  const store = useStore();
  const router = useRouter();

  // Initialize toast for notifications
  const toast = useToast();

  // Computed properties for user information
  const profilePicture = computed(() => store.state.user?.photoprofile || '/path/to/default-image.png');
  const userName = computed(() => store.state.user?.name || 'Guest');
  const phoneNumber = ref(store.state.user?.phonenumber || '');

  // Initialize balance, total products, and total tenants
  const balance = ref(0);
  const totalProducts = ref(0);
  const totalTenants = ref(0);

  // Initialize modal state and withdrawal details
  const isModalOpen = ref(false);
  const withdrawAmount = ref(0);
  const selectedMethod = ref(''); // Tracks selected payment method (E-Wallet or Bank)
  const targetTransfer = ref(''); // Stores E-Wallet or Bank name
  const norekening = ref(''); // Stores bank account number

  // Format balance for display
  const formattedBalance = computed(() => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(balance.value);
  });

  // Fetch token from localStorage
  const token = localStorage.getItem('token');

  // Fetch user's balance
  const fetchBalance = async () => {
    try {
      const response = await axios.get('https://api.nearus.id/api/orders/balance', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        balance.value = response.data['Balance Count'];
      } else {
        toast.error('Failed to fetch balance');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast.error('Error fetching balance');
    }
  };

  // Fetch total products
  const fetchTotalProducts = async () => {
    try {
      const response = await axios.get('https://api.nearus.id/api/product/ownerid', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.message === "success get all product by owner Id") {
        totalProducts.value = response.data.data.length;
      } else {
        toast.error('Failed to fetch total products');
      }
    } catch (error) {
      console.error('Error fetching total products:', error);
      toast.error('Error fetching total products');
    }
  };

  // Fetch total tenants
  const fetchTotalTenants = async () => {
    try {
      const response = await axios.get('https://api.nearus.id/api/orders/paid', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        totalTenants.value = response.data.orders.length;
      } else {
        toast.error('Failed to fetch total tenants');
      }
    } catch (error) {
      console.error('Error fetching total tenants:', error);
      toast.error('Error fetching total tenants');
    }
  };

  // Select payment method (E-Wallet or Bank)
  const selectMethod = (method) => {
    selectedMethod.value = method;
  };

  // Open the withdrawal modal
  const openModal = () => {
    isModalOpen.value = true;
    selectedMethod.value = ''; // Reset selected method
    withdrawAmount.value = 0; // Reset withdrawal amount
    targetTransfer.value = ''; // Reset E-Wallet or Bank name
    norekening.value = ''; // Reset bank account number
  };

  // Close the withdrawal modal
  const closeModal = () => {
    isModalOpen.value = false;
  };

  // Submit withdrawal request (common for both E-Wallet and Bank)
  const submitWithdrawal = async () => {
    const endpoint = 'https://api.nearus.id/api/orders/request-disbursement';
    const data = {
      id: store.state.user.id,
      ownerId: store.state.user.id,
      name: userName.value,
      phonenumber: phoneNumber.value,
      amount: withdrawAmount.value,
      norekening: norekening.value,
      targettransfer: targetTransfer.value,
    };

    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(`Penarikan dana berhasil! Silahkan cek email Anda untuk notifikasi.`);
        closeModal();
        setTimeout(() => {
          window.location.reload(); // Refresh halaman setelah beberapa detik
        }, 5000);
      } else {
        toast.error(`Penarikan dana gagal: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error submitting withdrawal:', error);
      toast.error('Terjadi kesalahan saat memproses penarikan dana.');
    }
  };

  // Submit E-Wallet withdrawal
  const submitWithdrawalEwallet = async () => {
    await submitWithdrawal();
  };

  // Submit Bank withdrawal
  const submitWithdrawalBank = async () => {
    await submitWithdrawal();
  };

  // Fetch data when component is mounted
  onMounted(() => {
    fetchBalance();
    fetchTotalProducts();
    fetchTotalTenants();
  });

  </script>



  <style lang="scss" scoped>
  /* Add any additional styling here */
  </style>