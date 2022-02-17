<script setup>
import { LineChart, useLineChart } from 'vue-chart-3'
import { VCard, VCardBody, VCardHeading, VCardFooter } from './AppCard.vue'
import { useSalesForMonth } from '../composables/useDashboard'
import BaseButton from './BaseButton.vue'
import { computed, watchEffect, ref, reactive } from 'vue'
// Line Chart

const { earningsPerDay } = useSalesForMonth()
const totalEarnings = computed(() => {
  return earningsPerDay.value.reduce((acc, curr) => acc + curr.earnings, 0)
})

watchEffect(() => {
  // console.log(totalEarnings.value)
  console.log(earningsPerDay.value)
})

const range = (start, end) => Array.from({ length: end - start }, (_, i) => i + start)

const lineChartData = computed(() => ({
  labels: range(1, earningsPerDay.value.length + 1),
  // labels: [2, 4, 3],
  datasets: [
    {
      lineTension: 0.3,
      label: 'My First dataset',
      fill: true,
      backgroundColor: 'rgba(41, 128, 185, 0.1)',
      strokeColor: 'none',
      borderColor: 'rgba(41, 128, 185, 0.5)',
      borderWidth: 5,
      radius: 0,

      data: earningsPerDay.value.map(data => data.earnings),
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
      <p>Earnings This Month</p>
      <!-- {{ earningsPerDay }} -->

      <p class="text-3xl font-semibold font-montserrat">${{ totalEarnings }}</p>
      <div class="w-full flex" style="height: 200px">
        <line-chart :chart-data="lineChartData" :options="options" class="w-full"></line-chart>
      </div>
    </v-card-body>
  </v-card>
</template>
