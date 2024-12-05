<template>
  <div class="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-16">
    <!-- About Us Components -->
    <AboutUsCard />
    <CardProductAboutUs />
    <AboutUsText />
    <CariKosSeakrang />
    <AboutUsDokumentasi />

    <!-- Profile Card -->
    <ProfileCard v-if="showProfileCard" class="profile-card mt-8 md:mt-12"/>

    <!-- Hero Text -->
    <div class="text-sky-600 text-2xl md:text-3xl lg:text-4xl font-bold font-['Montserrat'] mt-12 md:mt-20 lg:mt-40 text-center max-w-6xl">
      "NeaRuS: Temukan Kost Terbaik, Nyaman, dan Terjangkau untuk Kehidupan yang Lebih Baik!"
    </div>

    <!-- Footer -->
    <Footer class="mt-12 md:mt-16 lg:mt-24"/>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AboutUsCard from "@/components/AboutUs/AboutUsCard.vue";
import CardProductAboutUs from "@/components/AboutUs/CardProductAboutUs.vue";
import AboutUsText from "@/components/AboutUs/AboutUsText.vue";
import CariKosSeakrang from "@/components/Home/CariKosSekarang.vue";
import AboutUsDokumentasi from "@/components/AboutUs/AboutUsDokumentasi.vue";
import Footer from "@/components/Pages/Footer.vue";
import ProfileCard from "@/components/Profile/ProfileCard.vue";

export default {
  components: {
    ProfileCard,
    AboutUsCard,
    CardProductAboutUs,
    AboutUsText,
    CariKosSeakrang,
    AboutUsDokumentasi,
    Footer
  },
  setup() {
    const showProfileCard = ref(false);

    const toggleProfileCard = () => {
      showProfileCard.value = !showProfileCard.value;
    };

    onMounted(() => {
      window.addEventListener('toggle-profile-card', toggleProfileCard);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('toggle-profile-card', toggleProfileCard);
    });

    return {
      showProfileCard
    };
  }
};
</script>

<style scoped>
</style>
