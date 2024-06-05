<template>
  <div class="flex flex-col items-center">
    <AboutUsCard />
    <CardProductAboutUs />
    <AboutUsText />
    <TeamCard class="mb-80"/>
    <AboutUsDokumentasi />
    <ProfileCard v-if="showProfileCard" class="profile-card"/>
    <div class="w-[1777px] text-sky-600 text-4xl font-bold font-['Montserrat'] mt-40">"NeaRuS: Temukan Kost Terbaik, Nyaman, dan Terjangkau untuk Kehidupan yang Lebih Baik!"</div> <!-- Menambahkan margin-top -->
    <Footer  /> 
  </div>
</template>

<script>
import AboutUsCard from "@/components/AboutUsCard.vue";
import CardProductAboutUs from "@/components/CardProductAboutUs.vue";
import AboutUsText from "@/components/AboutUsText.vue";
import TeamCard from "@/components/TeamCard.vue";
import AboutUsDokumentasi from "@/components/AboutUsDokumentasi.vue"; 
import Footer from "@/components/Footer.vue";
import ProfileCard from "@/components/ProfileCard.vue";

export default {
  components: {
    ProfileCard,
    AboutUsCard,
    CardProductAboutUs,
    AboutUsText,
    TeamCard,
    AboutUsDokumentasi, 
    Footer
  },
};
</script>

<style scoped>
</style>
