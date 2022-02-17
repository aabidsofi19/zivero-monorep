<script setup>
import withSideBarLayout from '../layouts/WithSideBar.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GetOrders } from 'graphql-client/admin/orders'
import summaryChart from '../components/SalesSummary.vue'
import DashboardOverviewCards from '../components/DashBoardOverviewCards.vue'
import EarningsMonth from '../components/DashboardEarningMonth.vue'
import SalesMonth from '../components/DashboardSalesMonth.vue'
import OrdersTable from '../components/OrdersTable.vue'

const { result, loading, error } = useQuery(GetOrders, {
  variables: {
    first: 10,
  },
})

const recentOrders = useResult(result, [], data => data.orders.edges)
</script>

<template>
  <with-side-bar-layout>
    <main class="space-y-3">
      <dashboard-overview-cards></dashboard-overview-cards>
      <div>
        <h2 class="text-2xl font-montserrat font-semibold py-3 text-gray-600">Earnings Summary</h2>
        <div class="grid grid-cols-3 gap-8">
          <div class="flex flex-col justify-between">
            <earnings-month class=""></earnings-month>
            <sales-month class=""></sales-month>
          </div>
          <summary-chart class="w-full col-span-2"></summary-chart>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-montserrat font-semibold py-3 text-gray-600">Recent Orders</h2>
        <orders-table :orders="recentOrders"></orders-table>
      </div>
    </main>
  </with-side-bar-layout>
</template>
