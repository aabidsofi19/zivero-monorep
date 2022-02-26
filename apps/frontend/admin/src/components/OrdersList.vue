<template>
  <v-card outlined class="p-0">
    <orders-filter-drawer :is-open="open" :toggle="toggleDrawer"></orders-filter-drawer>
    <div>
      <!-- product status tabs -->
      <div class="flex px-5 pt-3 border-b-2">
        <button
          class="transition-all duration-100 ease-in-out transform hover:scale-110"
          :class="[
            'mr-8 m-0 py-2.5 text-sm leading-5 font-medium text-gray-500  ',

            filter.paymentStatus == null && filter.fulfillmentStatus == null
              ? 'border-b-4 border-green-800 font-bold text-black'
              : 'border-b-4 border-transparent',
          ]"
          @click="resetFilters"
        >
          All Orders
        </button>
        <div v-for="status in paymentStatuses" :key="status.value">
          <button
            class="transition-all duration-100 ease-in-out transform hover:scale-110"
            :class="[
              'mr-8 m-0 py-2.5 text-sm leading-5 font-medium text-gray-500  ',

              filter.paymentStatus == status.value
                ? 'border-b-4 border-green-800 font-bold text-black'
                : 'border-b-4 border-transparent',
            ]"
            @click="setFilter('paymentStatus', status.value)"
          >
            {{ status.name }}
          </button>
        </div>
        <div v-for="status in fulfillmentStatuses" :key="status.value">
          <button
            class="transition-all duration-100 ease-in-out transform hover:scale-110"
            :class="[
              'mr-8 m-0 py-2.5 text-sm leading-5 font-medium text-gray-500  ',

              filter.fulfillmentStatus == status.value
                ? 'border-b-4 border-green-800 font-bold text-black'
                : 'border-b-4 border-transparent',
            ]"
            @click="setFilter('fulfillmentStatus', status.value)"
          >
            {{ status.name }}
          </button>
        </div>
      </div>

      <div class="flex py-3 px-5 justify-between flex-nowrap gap-2">
        <div class="text-lg rounded-md text-gray-400 border-2 py-1 px-2 w-4/5 focus-within:border-blue-400">
          <font-awesome-icon icon="search" class="text-current mr-1"></font-awesome-icon>
          <input
            type="text"
            placeholder="search orders"
            class="w-11/12 text-gray-500 border-none focus:ring-transparent focus:border-none"
          />
        </div>

        <div class="flex items-center gap-3">
          <sort-dropdown-menu
            :sorting-options="sortOptions"
            :selected="sortedBy"
            @onSort="setSort"
          ></sort-dropdown-menu>
          <button class="border border-gray-500 py-2 px-3 w-full text-sm" @click="toggleDrawer()">More Filters</button>
        </div>
      </div>

      <div v-if="loading">loading</div>
      <div v-else-if="error">
        {{ error }}
      </div>
      <div v-else>
        <orders-table :orders="orderNodes"></orders-table>
      </div>
    </div>
    <v-card-footer>
      <v-pagination
        :total-pages="pageInfo.totalPages"
        :current-page="pageInfo.currentPage"
        @go-to-page="loadPage"
      ></v-pagination>
    </v-card-footer>
  </v-card>
</template>

<script>
import useNavdrawer from '../composables/useNavdrawer'
import { VCard, VCardFooter } from './AppCard.vue'
import OrdersFilterDrawer from './OrdersFilterDrawer.vue'
import VPagination from './BasePagination.vue'
import OrdersTable from './OrdersTable.vue'
import SortDropdownMenu from './SortDropdownMenu.vue'
import useOrders, { sortOptions } from '../composables/useOrders'

export default {
  components: {
    VCard,
    OrdersFilterDrawer,
    SortDropdownMenu,
    VCardFooter,
    OrdersTable,
    VPagination,
  },

  setup() {
    const { open, toggleDrawer } = useNavdrawer(true)

    const paymentStatuses = [
      {
        name: 'Paid',
        value: 'succeeded',
      },
      {
        name: 'Cancelled',
        value: 'cancelled',
      },
    ]

    const fulfillmentStatuses = [
      {
        name: 'Unfullfilled',
        value: 'Unfulfilled',
      },
      {
        name: 'Partially Fulfilled',
        value: 'PartiallyFulfilled',
      },
      {
        name: 'Fulfilled',
        value: 'Fulfilled',
      },
    ]

    return {
      ...useOrders(),
      open,
      toggleDrawer,
      paymentStatuses,
      fulfillmentStatuses,
      sortOptions,
    }
  },
}
</script>
