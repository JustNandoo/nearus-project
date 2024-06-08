<template>
  <div class="flex">
    <sidebar/>
    <div>
      <div class="ml-12 flex-col mt-10">
        <h1 class="font-bold text-black text-[22px]">Statistik Penjualan</h1>
        <ColumnChart/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/sidebar.vue";
import ColumnChart from "@/components/ColumnChart.vue";
import WelcomDashboard from "@/components/WelcomDashboard.vue";
</script>

<style lang="scss" scoped>

</style>