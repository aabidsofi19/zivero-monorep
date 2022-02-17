<script setup>
import { computed, ref } from 'vue'
import { LineChart, useLineChart } from 'vue-chart-3'
import { VCard, VCardBody, VCardHeading, VCardFooter } from './AppCard.vue'
import { useSalesForMonths, useSalesForMonth } from '../composables/useDashboard'
import BaseButton from './BaseButton.vue'
import max from 'lodash/max'
import range from 'lodash/range'
// Line Chart

const salesFor = ref('year')
const labels = computed(() => {
  if (salesFor.value === 'year') {
    return ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'july', 'September', 'October', 'Nov', 'Dec']
  }
})

const salesData = computed(() => {
  if (salesFor.value === 'year') {
    const date = new Date()
    const year = date.getFullYear()
    const start = new Date(year, 1, 1)
    const end = new Date(year, 12, 31)

    return useSalesForMonths(start, end)
  }
})

const sales = computed(() => {
  if (salesFor.value === 'year') {
    const { salesMonthRange } = salesData.value
    const lastMonth = max(salesMonthRange.value.map(({ month }) => month))
    const defaultData = range(lastMonth).map(() => 0)
    salesData.value.salesMonthRange.value.forEach(({ sales, month }) => {
      defaultData[month] = sales
    })
    return defaultData
  }
})

var lineChartData = computed(() => ({
  labels: labels.value,

  datasets: [
    {
      fill: true,
      lineTension: 0.3,
      label: 'My First dataset',
      backgroundColor: 'rgba(41, 128, 185, 0.2)',
      strokeColor: 'none',
      borderColor: 'rgba(41, 128, 185, 0)',
      radius: 2,
      borderColor: 'rgba(41, 128, 185, 0.5)',
      borderWidth: 3,
      pointColor: 'rgba(41, 128, 185, 0.9)',
      pointStrokeColor: 'rgba(41, 128, 185, 0)',
      pointHighlightFill: 'rgba(41, 128, 185, 0.9)',
      pointHighlightStroke: 'rgba(41, 128, 185, 0)',
      data: sales.value,
    },
  ],
}))

const options = {
  plugins: { legend: { display: false } },

  scales: {
    x: {
      grid: {
        showTooltip: true,
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
}
</script>

<template>
  <v-card>
    <v-card-heading outlined-bottom>
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 rounded-md bg-lime-100">
          <p class="text-sm font-normal">Top Order</p>
          <p class="text-lg py-2 font-gray-800">764387</p>
        </div>
        <div class="p-3 rounded-md bg-teal-100">
          <p class="text-sm font-normal">Average Order</p>
          <p class="text-lg py-2 font-gray-800">764387</p>
        </div>
      </div>
    </v-card-heading>
    <v-card-body>
      <line-chart :chart-data="lineChartData" :options="options"></line-chart>
    </v-card-body>
    <v-card-footer>
      <div class="flex bg-mint p-2 rounded-md gap-2 justify-between">
        <button class="w-full py-2 bg-white rounded-md text-blue-800">One Week</button>
        <button class="w-full py-2 bg-white rounded-md text-blue-800">One Month</button>

        <button class="w-full py-2 bg-white rounded-md text-blue-800">Three Month</button>
        <button class="w-full py-2 text-white bg-teal-800 rounded-md">One Year</button>
      </div>
    </v-card-footer>
  </v-card>
</template>
