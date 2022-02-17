<script setup>
import { LineChart, useLineChart } from 'vue-chart-3'
import { VCard, VCardBody, VCardHeading, VCardFooter } from './AppCard.vue'
import { useSalesForMonth } from '../composables/useDashboard'
import BaseButton from './BaseButton.vue'
import { computed, watchEffect, ref, reactive } from 'vue'
// Line Chart

const { salesPerDay } = useSalesForMonth()
const totalSales = computed(() => {
  return salesPerDay.value.reduce((acc, curr) => acc + curr.sales, 0)
})

const range = (start, end) => Array.from({ length: end - start }, (_, i) => i + start)

const lineChartData = computed(() => ({
  labels: range(1, salesPerDay.value.length + 1),
  // labels: [2, 4, 3],
  datasets: [
    {
      lineTension: 0.3,
      label: 'My First dataset',
      fill: true,
      backgroundColor: 'rgba(213 ,233, 221,0.3)',
      strokeColor: 'none',
      borderColor: 'rgba(213, 233 ,221,1)',
      borderWidth: 5,
      radius: 0,

      data: salesPerDay.value.map(data => data.sales),
    },
  ],
}))
const options = {
  plugins: { legend: { display: false } },

  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        drawBorder: false,
        showTooltip: true,
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
  responsive: true,
  aspectRatio: 1,
  maintainAspectRatio: false,
}
</script>

<template>
  <v-card outlined rounded="xl">
    <v-card-body>
      <p>Sales This Month</p>
      <!-- {{ earningsPerDay }} -->

      <p class="text-3xl font-semibold font-montserrat">{{ totalSales }}</p>
      <div class="w-full flex" style="height: 200px">
        <line-chart :chart-data="lineChartData" :options="options" class="w-full"></line-chart>
      </div>
    </v-card-body>
  </v-card>
</template>
