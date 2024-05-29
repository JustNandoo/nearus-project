<template>
  <div class="flex flex-col items-center">
    <AboutUsCard />
    <CardProductAboutUs />
    <TeamCard />
    <Footer />
  </div>
</template>

<script>
import AboutUsCard from "@/components/AboutUsCard.vue";
import CardProductAboutUs from "@/components/CardProductAboutUs.vue";
import Footer from "@/components/Footer.vue";
import TeamCard from "@/components/TeamCard.vue";

export default {
  components: {
    AboutUsCard,
    CardProductAboutUs,
    TeamCard,
    Footer
  },
};
</script>

<style lang="scss" scoped>
</style>
