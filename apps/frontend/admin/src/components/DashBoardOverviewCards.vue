<script setup>
import { reactive, computed, watchEffect, watch, watchPostEffect } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GetOverviewStats } from 'graphql-client/admin/dashboard'
import { VCard, VCardBody } from './AppCard.vue'

const { result, loading, error } = useQuery(GetOverviewStats)
const unfulfilledOrdersCount = useResult(result, 0, data => data.unfulfilledOrders.totalItems)
const totalSales = useResult(result, 0, data =>
  data.totalSales.edges.reduce((acc, { node }) => acc + node.totalAmount, 0),
)
const totalProducts = useResult(result, 0, data => data.Products.totalProducts)
const totalCustomers = useResult(result, 0, data => data.customers.totalItems)

const overviewData = reactive({
  unfulfilledOrders: {
    value: unfulfilledOrdersCount.value,
    icon: 'shopping-bag',
    color: '#f1d3a1',
  },
  customers: {
    value: unfulfilledOrdersCount.value,
    icon: 'user',
    color: '#faaf92',
  },
  products: {
    value: 0,
    icon: 'shopping-cart',
    color: '#baca34',
  },
  sales: {
    value: 100,
    icon: 'dollar-sign',
    color: '#89b4c4',
  },
})
watchEffect(() => {
  overviewData.unfulfilledOrders.value = unfulfilledOrdersCount.value
  overviewData.sales.value = totalSales.value
  overviewData.products.value = totalProducts
  overviewData.customers.value = totalCustomers
})
</script>
<template>
  <div class="w-full" v-if="!loading">
    <div class="flex gap-6 justify-between">
      <v-card outlined rounded="xl" v-for="(value, key) in overviewData" :key="key" class="w-full">
        <v-card-body>
          <div class="flex gap-3 items-center">
            <div class="grow">
              <p class="text-5xl font-montserrat text-gray-800 font-semibold">{{ value.value }}</p>
              <p class="text-gray-600 py-2">{{ key }}</p>
            </div>

            <div
              class="rounded-full w-24 h-24 flex justify-center items-center"
              :style="{ backgroundColor: `${value.color}4c` }"
            >
              <span :style="{ color: value.color }">
                <font-awesome-icon class="text-5xl" :icon="value.icon"></font-awesome-icon>
              </span>
            </div>
          </div>
        </v-card-body>
      </v-card>
    </div>
  </div>
</template>
