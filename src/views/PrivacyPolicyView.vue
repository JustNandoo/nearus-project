<template>
  <div class="flex flex-col min-h-screen">
    <NavFixed />

    <div class="flex-grow flex flex-col items-center py-20">
      <div class="w-11/12 max-w-7xl flex flex-col items-center mb-10">
        <div class="text-center mb-10 mt-10"> <!-- Add mt-10 here -->
          <h1 class="text-black text-5xl font-bold font-montserrat capitalize leading-tight">Syarat & Ketentuan</h1>
          <p class="text-black/80 text-lg font-medium font-montserrat tracking-tight">Mohon Dibaca dan Dicermati Supaya
            Tidak Ada Kesalahpahaman :D</p>
        </div>
      </div>

      <div class="w-11/12 bg-white shadow border border-black rounded-lg mb-10 p-10">
        <h2 class="text-black text-3xl font-semibold font-montserrat mb-6">Syarat & Ketentuan Penyewa Kost</h2>
        <div class="text-black text-lg font-normal font-montserrat leading-relaxed space-y-6">
          <p><strong>1. Pendaftaran dan Verifikasi</strong><br>Penyewa diwajibkan untuk mengisi formulir pendaftaran
            dengan lengkap dan jujur. Informasi yang diminta mencakup nama lengkap, alamat tempat tinggal, nomor
            telepon, email, dan data pribadi lainnya yang relevan.</p>
          <p>Penyewa harus menyerahkan fotokopi KTP, SIM, paspor, atau identitas resmi lainnya yang masih berlaku.
            Dokumen ini akan digunakan untuk verifikasi identitas penyewa dan memastikan keabsahan data yang diberikan.
          </p>

          <p><strong>2. Pembayaran</strong><br>Penyewa wajib membayar biaya sewa tepat waktu sesuai dengan jadwal yang
            telah disepakati. Pembayaran dapat dilakukan bulanan, triwulanan, atau tahunan, sesuai dengan kesepakatan
            awal.</p>
          <p>Pembayaran dilakukan melalui transfer bank ke rekening yang telah ditentukan oleh pemilik kost atau melalui
            metode pembayaran lain yang disediakan, seperti e-wallet atau pembayaran online.</p>
          <p>Biaya sewa yang telah dibayarkan tidak dapat dikembalikan, kecuali dalam kondisi tertentu seperti kesalahan
            dari pihak pemilik kost atau jika ada perjanjian khusus yang mengatur pengembalian dana.</p>

          <p><strong>3. Masa Sewa</strong><br>Masa sewa minimal adalah satu bulan kalender. Penyewa dapat memilih masa
            sewa yang lebih panjang sesuai kebutuhan dan kesepakatan dengan pemilik kost.</p>
          <p>Jika penyewa ingin memperpanjang masa sewa, permohonan perpanjangan harus diajukan kepada pemilik kost
            setidaknya 14 hari sebelum masa sewa berakhir. Pemilik kost akan memberikan konfirmasi penerimaan atau
            penolakan perpanjangan tersebut.</p>

          <p><strong>4. Tanggung Jawab dan Kewajiban Penyewa</strong><br>Penyewa bertanggung jawab untuk menjaga
            kebersihan dan ketertiban kamar kost mereka. Penyewa diharapkan menjaga kamar tetap bersih, rapi, dan
            terawat.</p>
          <p>Penyewa wajib mematuhi semua aturan dan tata tertib yang diberlakukan oleh pemilik kost, termasuk aturan
            mengenai jam malam, tamu, penggunaan fasilitas bersama, dan larangan merokok atau membawa hewan peliharaan.
          </p>
          <p>Penyewa dilarang keras membawa barang-barang terlarang seperti narkoba, senjata, atau barang berbahaya
            lainnya ke dalam kost, serta melakukan kegiatan ilegal atau tindakan yang merugikan pihak lain.</p>

          <p><strong>5. Kebijakan Penghuni Tambahan</strong><br>Penyewa harus memberitahukan dan mendapatkan izin
            tertulis dari pemilik kost jika ada penghuni tambahan yang akan tinggal bersama mereka.</p>
          <p>Setiap penghuni tambahan akan dikenakan biaya tambahan sesuai dengan kebijakan yang ditetapkan oleh pemilik
            kost. Biaya ini mungkin mencakup biaya listrik, air, atau layanan lainnya.</p>

          <p><strong>6. Kerusakan dan Perbaikan</strong><br>Penyewa bertanggung jawab atas kerusakan yang disebabkan
            oleh kelalaian atau kesalahan mereka. Penyewa harus segera melaporkan kerusakan kepada pemilik kost.</p>
          <p>Pemilik kost akan melakukan perbaikan yang diperlukan secepat mungkin. Jika kerusakan disebabkan oleh
            penyewa, biaya perbaikan akan dibebankan kepada penyewa.</p>

          <p><strong>7. Keamanan</strong><br>Penyewa diharapkan untuk menjaga keamanan barang-barang pribadi mereka.
            Disarankan untuk tidak menyimpan barang berharga di dalam kamar tanpa pengamanan yang memadai.</p>
          <p>Pemilik kost tidak bertanggung jawab atas kehilangan atau kerusakan barang milik penyewa, kecuali jika
            kehilangan atau kerusakan tersebut disebabkan oleh kelalaian pemilik kost.</p>

          <p><strong>8. Pengakhiran Sewa</strong><br>Pemilik kost berhak mengakhiri perjanjian sewa jika penyewa
            melanggar syarat dan ketentuan yang berlaku, seperti tidak membayar sewa tepat waktu atau melanggar aturan
            tata tertib.</p>
          <p>Pada saat masa sewa berakhir, penyewa wajib mengosongkan kamar, mengembalikan kunci kamar, dan memastikan
            kamar dalam kondisi bersih dan tidak ada barang yang tertinggal.</p>
        </div>
      </div>


      <div class="w-11/12 bg-white shadow border border-black rounded-lg p-10">
        <h2 class="text-black text-3xl font-semibold font-montserrat mb-6">Syarat & Ketentuan Pemilik Kost</h2>
        <div class="text-black text-lg font-normal font-montserrat leading-relaxed space-y-6">
          <p><strong>1. Informasi Kost</strong><br>Pemilik kost wajib memberikan informasi yang benar dan akurat
            mengenai fasilitas, kondisi, dan peraturan kost. Informasi ini harus mencakup detail tentang ukuran kamar,
            fasilitas yang tersedia (seperti AC, Wi-Fi, dapur bersama, dll.), dan biaya sewa.</p>
          <p>Pemilik kost harus menyediakan foto terbaru yang mencerminkan kondisi sebenarnya dari kamar dan fasilitas
            kost. Foto-foto ini akan membantu calon penyewa dalam membuat keputusan.</p>

          <p><strong>2. Penerimaan Penyewa</strong><br>Pemilik kost berhak untuk menerima atau menolak calon penyewa
            berdasarkan kebijakan internal yang berlaku. Kriteria penerimaan bisa termasuk pemeriksaan latar belakang,
            referensi dari tempat tinggal sebelumnya, atau kemampuan finansial penyewa.</p>
          <p>Pemilik kost harus memberitahukan kepada calon penyewa jika ada persyaratan tambahan yang harus dipenuhi,
            seperti deposit keamanan atau surat pernyataan tertentu.</p>

          <p><strong>3. Perjanjian Sewa</strong><br>Pemilik kost harus menyediakan perjanjian sewa yang jelas dan
            mencakup semua syarat dan ketentuan yang berlaku. Perjanjian ini harus mencakup detail tentang biaya sewa,
            masa sewa, aturan kost, dan kewajiban kedua belah pihak.</p>
          <p>Perjanjian sewa harus ditandatangani oleh kedua belah pihak sebelum masa sewa dimulai untuk memastikan
            adanya kesepakatan yang sah.</p>

          <p><strong>4. Pembayaran dan Pengembalian Dana</strong><br>Pemilik kost harus memberikan konfirmasi penerimaan
            pembayaran kepada penyewa dalam bentuk tanda terima atau bukti transfer.</p>
          <p>Jika ada pengembalian dana yang harus dilakukan, pemilik kost wajib mengembalikan dana tersebut sesuai
            dengan ketentuan yang telah disepakati, misalnya dalam kasus pembatalan sewa yang disetujui atau
            pengembalian deposit keamanan.</p>

          <p><strong>5. Pemeliharaan dan Perbaikan</strong><br>Pemilik kost bertanggung jawab atas pemeliharaan dan
            perbaikan fasilitas kost yang rusak bukan karena kesalahan penyewa. Ini termasuk perawatan rutin dan
            perbaikan kerusakan yang terjadi akibat penggunaan normal.</p>
          <p>Pemilik kost harus menanggapi laporan kerusakan dari penyewa dengan cepat dan melakukan perbaikan yang
            diperlukan agar kenyamanan penyewa tidak terganggu.</p>

          <p><strong>6. Kebijakan Penghuni Tambahan</strong><br>Pemilik kost harus memberitahukan kepada penyewa
            mengenai biaya tambahan yang dikenakan untuk penghuni tambahan. Biaya ini harus dijelaskan dengan transparan
            di awal perjanjian.</p>
          <p>Pemilik kost berhak untuk mengecek jumlah penghuni di kamar kost secara berkala untuk memastikan kepatuhan
            terhadap ketentuan yang berlaku.</p>

          <p><strong>7. Privasi dan Keamanan</strong><br>Pemilik kost harus menjaga privasi penyewa dan tidak boleh
            masuk ke kamar penyewa tanpa izin kecuali dalam keadaan darurat yang memerlukan tindakan segera.</p>

          <p><strong>8. Privasi dan Keamanan</strong><br>Pemilik kost harus menjaga privasi penyewa dan tidak boleh
            masuk ke kamar penyewa tanpa izin kecuali dalam keadaan darurat yang memerlukan tindakan segera.</p>
          <p>Pemilik kost harus menyediakan fasilitas keamanan yang memadai, seperti kunci yang aman dan, jika
            memungkinkan, sistem keamanan tambahan seperti CCTV atau penjaga.</p>

          <p><strong>9. Pengakhiran Sewa</strong><br>Pemilik kost harus memberikan pemberitahuan minimal 30 hari sebelum
            mengakhiri perjanjian sewa, kecuali dalam kasus pelanggaran serius oleh penyewa yang memerlukan tindakan
            segera.</p>
          <p>Pada saat pengakhiran sewa, pemilik kost harus memberikan alasan yang jelas dan memastikan bahwa proses
            pengakhiran dilakukan secara adil dan sesuai dengan peraturan yang berlaku.</p>
        </div>
      </div>
    </div>

    <!-- Profile Card -->
    <ProfileCard v-if="showProfileCard" />
    <FooterComponent />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavFixed from '@/components/NavFixed.vue';
import Footer from '@/components/Footer.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import FooterComponent from "@/components/Footer.vue";

export default {
  name: 'TermsAndConditions',
  components: {
    NavFixed,
    Footer,
    ProfileCard,
    FooterComponent
  },
  setup() {
    const showProfileCard = ref(false);

    const toggleProfileCard = () => {
      showProfileCard.value = !showProfileCard.value;
    };

    const handleToggleProfileCard = () => {
      toggleProfileCard();
    };

    onMounted(() => {
      window.addEventListener('toggle-profile-card', handleToggleProfileCard);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('toggle-profile-card', handleToggleProfileCard);
    });

    return {
      showProfileCard,
    };
  },
};
</script>

<style>
/* Add your styles here */
</style>