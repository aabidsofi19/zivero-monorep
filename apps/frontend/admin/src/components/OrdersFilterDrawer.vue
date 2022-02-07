<script setup>
import { reactive } from 'vue'
import useOrders from '../composables/useOrders'
import BaseNavDrawer from './BaseNavDrawer.vue'
import BaseListItemGroup, { BaseListItem } from './BaseListItemGroup.vue'

defineProps({
  isOpen: { type: Boolean, default: false },
  toggleDrawer: { type: Function, required: true },
})

const { setFilters, resetFilters, filter, filterOptions } = useOrders()

const selectedFilters = reactive({ ...filter })

const saveFilters = () => {
  setFilters(selectedFilters)
}
</script>

<template>
  <base-nav-drawer :is-open="$props.isOpen" toggle="$props.toggleDrawer" panel-title="Order Filters">
    <div>
      <ul>
        <base-list-item-group v-model="selectedFilters.paymentStatus" title="Payment Status">
          <base-list-item v-for="status in filterOptions.paymentStatus" :key="status" :value="status">
            {{ status }}
          </base-list-item>
        </base-list-item-group>
        <base-list-item-group v-model="selectedFilters.fulfillmentStatus" title="Fulfillment Status">
          <base-list-item v-for="status in filterOptions.fulfillmentStatus" :key="status" :value="status">
            {{ status }}
          </base-list-item>
        </base-list-item-group>
      </ul>
    </div>
    <div class="flex justify-between py-5 px-3">
      <button class="px-3 py-2 border rounded-md text-gray-400" @click="resetFilters">Clear Filters</button>
      <button class="px-3 mx-5 py-2 border rounded-md text-white bg-green-800" @click="saveFilters">Done</button>
    </div>
  </base-nav-drawer>
</template>
