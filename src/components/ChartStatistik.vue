<template>
  <div class="max-w-screen mx-auto mt-10">
    <div id="chart" class="bg-white p-6 border border-gray-300 shadow-lg">
      <apexchart :type="chartType" :width="chartWidth" :height="chartHeight" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const chartType = ref('bar')
const chartWidth = ref('1430px')
const chartHeight = ref('250px')

const series = ref([
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66,51, 69 , 89],
  },
  {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94,51, 69 , 89],
  },
  {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 51, 69 , 89],
  },
])

const chartOptions = ref({
  chart: {
    type: chartType.value,
    width: chartWidth.value,
    height: chartHeight.value,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$ ' + val + ' thousands'
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
