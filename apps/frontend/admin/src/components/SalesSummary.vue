<template>
  <div class="w-full card p-2 overflow-hidden flex flex-row flex-wrap">
    <!-- right -->
    <div class="border-r border-gray-200 md:w-2/3 w-full">
      <!-- top -->
      <div class="p-5 flex flex-row flex-wrap justify-between items-center">
        <h2 class="font-bold text-lg">Order Summary</h2>
        <div class="flex flex-row justify-center items-center">
          <a href="#" class="btn mr-4 text-sm py-2 block">month</a>
          <a href="#" class="btn-shadow text-sm py-2 block">week</a>
        </div>
      </div>
      <!-- end top -->

      <!-- chart -->

      <line-chart :chart-data="dataset" :options="options"></line-chart>
      <!-- end chart -->
    </div>
    <!-- end right -->

    <!-- left -->
    <div class="md:w-1/3 w-full">
      <!-- top -->
      <div class="p-5 border-b border-gray-200">
        <h2 class="font-bold text-lg mb-6">Sales History</h2>

        <div class="flex flex-row justify-between mb-3">
          <div class="">
            <h4 class="text-gray-600 font-thin">Puma Shoes</h4>
            <p class="text-gray-400 text-xs font-hairline">30 min ago</p>
          </div>
          <div class="text-sm font-medium"><span class="text-green-400">+</span> $250</div>
        </div>

        <div class="flex flex-row justify-between mb-3">
          <div class="">
            <h4 class="text-gray-600 font-thin">Google Pixel 4 xl</h4>
            <p class="text-gray-400 text-xs font-hairline">1 day ago</p>
          </div>
          <div class="text-sm font-medium"><span class="text-red-400">-</span> $10</div>
        </div>

        <div class="flex flex-row justify-between">
          <div class="">
            <h4 class="text-gray-600 font-thin">Nike Air Jordan</h4>
            <p class="text-gray-400 text-xs font-hairline">2 hour ago</p>
          </div>
          <div class="text-sm font-medium"><span class="text-red-400">-</span> $98</div>
        </div>
      </div>
      <!-- end top -->

      <!-- bottom -->
      <div class="p-5">
        <h2 class="font-bold text-lg mb-2">Sales History</h2>
        <strong class="text-teal-400 font-extrabold text-xl">$82,950.96</strong>

        <div class="bg-gray-300 h-2 rounded-full mt-2 relative">
          <div class="rounded-full bg-teal-400 h-full w-3/4 shadow-md"></div>
        </div>
      </div>
      <!-- end bottom -->
    </div>
    <!-- end left -->
  </div>
</template>

<script>
import { LineChart } from 'vue-chart-3'

export default {
  components: {
    LineChart,
  },
  data: () => ({
    dataset: {
      labels: ['jan', 'feb', 'oct', 'm', 's', 'ss', 'ds', 's'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          backgroundColor: 'rgb(153 246 228)',
        },
      ],
    },
    options: {
      xaxis: {
        tooltip: {
          enabled: false,
        },
      },
    },
  }),
}
</script>
