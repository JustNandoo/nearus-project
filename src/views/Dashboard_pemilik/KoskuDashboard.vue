    <template>
      <div class="flex">
        <sidebar />
        <div class="overflow-auto w-[80%] h-screen p-8">
          <div class="max-w-full">
            <div v-if="isLoading" class="text-gray-500">Loading...</div>
            <div v-else>
              <div class="flex-col gap-3">
                <h1 class="font-medium text-[20px] mb-4 text-left">Pesanan Kamar</h1>
                <div class="flex items-center justify-between mb-4">
                  <input type="text" v-model="searchQuery" placeholder="Search..." class="border rounded-lg p-2 w-1/2 bg-white border-blue-300"/>
                  <select v-model="sortOption" class="border rounded-lg p-2 bg-white border-blue-300">
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="duration">Sort by Duration</option>
                    <option value="status">Sort by Status</option>
                  </select>
                </div>
                <div v-if="filteredAndSortedOrders.length === 0" class="text-gray-500 text-center py-4">
                  Tidak ada data
                </div>
                <div v-else class="overflow-y-auto max-h-[400px] space-y-4 mt-5 shadow-md bg-[#D1E9F6] p-4 rounded-lg">
                  <div v-for="order in filteredAndSortedOrders" :key="order.id" class="bg-white shadow-md rounded-lg p-4">
                    <div class="flex items-center">
                      <img :src="order.image" alt="Room Image" class="w-20 h-20 rounded object-cover mr-4">
                      <div>
                        <h2 class="font-bold text-lg">{{ order.detail }}</h2>
                        <p class="text-gray-500">{{ order.location }}</p>
                      </div>
                    </div>
                    <div class="my-6 mx-4">
                      <p class="text-gray-700"><strong>Name Penyewa:</strong> {{ order.name }}</p>
                      <p class="text-gray-700"><strong>Nomor Telpon:</strong> {{ order.phonenumber }}</p>
                      <p class="text-gray-700"><strong>Price:</strong> {{ formatPrice(order.price) }}</p>
                      <p class="text-gray-700"><strong>Berlaku Hingga:</strong> {{ order.duration }}</p>
                      <p class="text-gray-700"><strong>Status Pembayaran:</strong> <span :class="statusClass(order.status)">{{ order.status }}</span></p>
                      <p class="text-gray-700"><strong>Fasilitas:</strong> {{ order.fasilitas }}</p>
                    </div>
                  </div>
                </div>
                <h1 class="font-medium text-[20px] mb-4 text-left mt-8">List Product</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="product in products" :key="product.id" class="bg-white shadow-md rounded-lg p-4 relative">
                    <!-- Three-dot menu -->
                    <div class="absolute top-2 right-2">
                      <button @click="toggleDropdown(product.id)" class="focus:outline-none">
                        <font-awesome-icon :icon="faEllipsisV" class="text-black"/>
                      </button>

                      <!-- Dropdown menu -->
                      <div v-if="dropdownVisible(product.id)" class="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg"><button @click="deleteProduct(product.id)" class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center">
                        <font-awesome-icon :icon="faTrash" class="mr-2 text-red-500"/>
                        Delete
                      </button>
                      </div>
                    </div>
                    <img v-if="product.image.length > 0" :src="product.image[0]" alt="Product Image" class="w-full h-32 rounded object-cover mb-4" @error="handleImageError">
                    <img v-else :src="placeholderImage" alt="Placeholder Image" class="w-full h-32 rounded object-cover mb-4">
                    <h2 class="font-bold text-lg">{{ product.productname }}</h2>
                    <p class="text-gray-500">{{ product.location }}</p>
                    <p class="text-gray-700"><strong>Category:</strong> {{ product.category }}</p>
                    <p class="text-gray-700"><strong>Fasilitas:</strong> {{ product.fasilitas.join(', ') }}</p>
                    <p v-if="product.price !== null" class="text-gray-700"><strong>Price:</strong> {{ formatPrice(product.price) }}</p>
                    <div class="absolute bottom-4 right-4">
                      <button @click="manageProduct(product.ownerId)" class="bg-blue-500 text-white px-4 py-2 rounded">Manage</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Product Modal -->
      <div class="fixed bottom-4 right-4">
        <button
            class="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex justify-center items-center"
            @click="showAddModal = true"
        >
          <font-awesome-icon :icon="faPlus" class="w-8 h-8"/>
        </button>
      </div>
      <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl max-h-screen overflow-y-auto relative">
          <button
              class="absolute top-2 right-2 text-gray-500"
              @click="closeAddModal"
          >
            <font-awesome-icon :icon="faTimes" class="w-6 h-6"/>
          </button>
          <h2 class="text-2xl font-bold mb-4">Tambahkan Data Kost Baru</h2>
          <form class="" @submit.prevent="addProduct">
            <div class="mb-5">
              <label class="block text-gray-700">Nama Kost</label>
              <input required type="text" v-model="newProduct.productname" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Masukan Nama Product">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Lokasi</label>
              <input required type="text" v-model="newProduct.location" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Masukan Alamat Kost">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Tipe Kost</label>
              <select required v-model="newProduct.category" class="w-full p-2 border border-gray-300 rounded mt-1">
                <option value="">Tipe Kost</option>
                <option value="pria">Pria</option>
                <option value="wanita">Wanita</option>
                <option value="campuran">Campuran</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Lokasi Koordinat</label>
              <div class="flex">
                <input required type="text" v-model="newProduct.linklocation" class="w-full p-2 border border-gray-300 rounded mt-1 mr-2" placeholder="Tekan Tombol Disamping untuk mendaptkan koordinat lokasi anda">
                <button type="button" class="bg-blue-primary rounded px-3 py-1" @click="getCurrentLocation">
                  <font-awesome-icon :icon="faLocationDot" class="w-5h-5 text-white"/>
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Harga Kost</label>
              <input required type="number" v-model="newProduct.price" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter price">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Durasi Bayar</label>
              <input required type="text" v-model="newProduct.duration" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter duration">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Fasilitas</label>
              <input required type="text" v-model="newProduct.fasilitas" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter facilities, separated by commas">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Deskripsi Kost</label>
              <input required type="text" v-model="newProduct.about" class="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Masukan Deskripsi">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Image</label>
              <input required type="file" multiple accept="image/*" @change="handleImageUpload" class="w-full p-2 border border-gray-300 rounded mt-1">
            </div>
            <div class="flex justify-end">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </template>



    <script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import { faPlus, faTimes, faLocationDot, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
    import Sidebar from "@/components/DashboardPemilik/sidebar.vue";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    import placeholderImage from '@/assets/images/bg-loginPage.png'; // Adjust the path as needed


    const router = useRouter()

    const manageProduct = (ownerId) => {
      router.push(`/dashboard-kosku-detail/${ownerId}`)
    }

    const showAddModal = ref(false)
    const isLoading = ref(false)
    const searchQuery = ref('')
    const sortOption = ref('name')
    const products = ref([])
    const orders = ref([])
    const newProduct = ref({
      productname: '',
      location: '',
      category: '',
      linklocation: '',
      price: null,
      duration: '',
      fasilitas: [],
      about: '',
      image: [],
      imagePreviews: [],
      ownerId: 0,
      roomId: null
    })

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      isLoading.value = true;
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          axios.get('https://api.nearus.id/api/product/ownerid', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://api.nearus.id/api/orders/paid', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (productsResponse.data && Array.isArray(productsResponse.data.data)) {
          products.value = productsResponse.data.data.map(product => ({
            ...product,
            image: product.image || [],  // Ensure image is an array
            fasilitas: Array.isArray(product.fasilitas) ? product.fasilitas : []  // Ensure fasilitas is an array
          }));
        } else {
          console.error('Unexpected products response format:', productsResponse.data);
          products.value = [];
        }

        if (ordersResponse.data && Array.isArray(ordersResponse.data.orders)) {
          orders.value = ordersResponse.data.orders;
        } else {
          console.error('Unexpected orders response format:', ordersResponse.data);
          orders.value = [];
        }

        console.log('Products Response:', productsResponse.data);
        console.log('Orders Response:', ordersResponse.data.orders); // Log the actual orders array
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        isLoading.value = false;
      }
    }

    const dropdowns = ref({});

    const toggleDropdown = (productId) => {
      dropdowns.value = { ...dropdowns.value, [productId]: !dropdowns.value[productId] };
    };

    const dropdownVisible = (productId) => {
      return dropdowns.value[productId] || false;
    };

    const handleImageUpload = (event) => {
      newProduct.value.image = Array.from(event.target.files);
    };


    const deleteProduct = async (productId) => {
      console.log('Product ID:', productId); // Add this line

      if (!productId) {
        console.error('Product ID is undefined');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        await axios.delete(`https://api.nearus.id/api/product/delete/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        products.value = products.value.filter(product => product.id !== productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          newProduct.value.linklocation = `${latitude},${longitude}`;
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };

    const closeAddModal = () => {
      showAddModal.value = false
    }

    const addProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        // Create FormData object
        const formData = new FormData();
        for (const key in newProduct.value) {
          if (key !== 'roomId') { // Exclude roomId from formData
            const value = newProduct.value[key];
            if (Array.isArray(value)) {
              value.forEach(item => formData.append(`${key}[]`, item));
            } else if (value !== undefined && value !== null) {
              formData.append(key, value);
            }
          }
        }

        // Post request with multipart/form-data
        await axios.post('https://api.nearus.id/api/addproduct', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        // Reset form and close modal
        newProduct.value = {
          productname: '',
          location: '',
          category: '',
          linklocation: '',
          price: null,
          duration: '',
          fasilitas: [],
          about: '',
          image: [],
          imagePreviews: [],
          ownerId: 0,  // Reset default value
          roomId: null  // Reset roomId
        };
        closeAddModal();
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Error adding product:', error.response.data); // Log detailed error response
      }
    };




    const filteredAndSortedOrders = computed(() => {
      return orders.value
          .filter(order => {
            return order.name.toLowerCase().includes(searchQuery.value.toLowerCase());
          })
          .sort((a, b) => {
            if (sortOption.value === 'name') return a.name.localeCompare(b.name);
            if (sortOption.value === 'price') return a.price - b.price;
            if (sortOption.value === 'duration') return new Date(a.duration) - new Date(b.duration);
            if (sortOption.value === 'status') return a.status.localeCompare(b.status);
            return 0;
          });
    });

    const statusClass = (status) => {
      switch (status) {
        case 'Paid':
          return 'text-green-500';
        case 'Pending':
          return 'text-yellow-500';
        case 'Cancelled':
          return 'text-red-500';
        default:
          return 'text-gray-500';
      }
    };

    const formatPrice = (price) => {
      if (price == null) return 'N/A';
      return `Rp ${price.toLocaleString('id-ID')}`;
    };



    onMounted(fetchData);
    </script>

    <style scoped>
    /* Add any additional styles here */
    </style>

