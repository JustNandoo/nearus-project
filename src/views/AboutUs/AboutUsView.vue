<template>
  <div class="flex flex-col items-center">
    <AboutUsCard />
    <CardProductAboutUs />
    <AboutUsText />
    <CariKosSeakrang/>
    <AboutUsDokumentasi />
    <ProfileCard v-if="showProfileCard" class="profile-card"/>
    <div class="w-[1777px] text-sky-600 text-4xl font-bold font-['Montserrat'] mt-40">"NeaRuS: Temukan Kost Terbaik, Nyaman, dan Terjangkau untuk Kehidupan yang Lebih Baik!"</div>
    <Footer /> 
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
