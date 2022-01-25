<script setup>
import withSideBarLayout from '../layouts/WithSideBar.vue'
import summaryChart from '../components/SalesSummary.vue'
import salesHistory from '../components/SalesTodayCard.vue'
import recentOrders from '../components/HomeRecentOrders.vue'
import bestSellers from '../components/HomeBestSellers.vue'
</script>

<template>
  <with-side-bar-layout>
    <main>
      <div class="flex-1 w-full pt-16 md:pt-0">
        <div class="flex w-full flex-wrap justify-center md:justify-between">
          <sales-history class=""></sales-history>
          <summary-chart class="w-full mt-1 md:w-2/3"></summary-chart>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <best-sellers></best-sellers>
        <recent-orders></recent-orders>
      </div>
    </main>
  </with-side-bar-layout>
</template>
