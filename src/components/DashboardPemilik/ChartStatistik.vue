<template>
  <div class="max-w-screen mx-auto mt-10">
    <div class="text-black font-bold mb-2 text-[20px]">
      Statistik Jumlah Penyewa Kost
    </div>
    <div id="chart" class="bg-white p-6 border border-gray-300 shadow-lg">
      <apexchart :type="chartType" :width="chartWidth" :height="chartHeight" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const chartType = ref('line')
const chartWidth = ref('1430px')
const chartHeight = ref('250px')

const series = ref([
  {
    name: 'Jumlah Penyewa',
    data: [5, 8, 10, 8, 10, 10, 9, 10, 10, 10, 10, 9],
  },
])

const chartOptions = ref({
  chart: {
    type: chartType.value,
    width: chartWidth.value,
    height: chartHeight.value,
  },
  stroke: {
    show: true,
    curve: 'smooth',
    width: 2,
    colors: ['#f00', '#0f0', '#00f'],
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yaxis: {
    title: {
      text: 'Penyewa/Bulan (orang)',
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: ['#f00', '#0f0', '#00f'], // Example colors for different series
    strokeColors: '#fff',
    strokeWidth: 2,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + ' orang'
      },
    },
  },
})
</script>

<script>
import { defineComponent } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
