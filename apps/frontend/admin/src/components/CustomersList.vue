<template>
  <v-card outlined class="p-0">
    <!-- <orders-filter-drawer :is-open="open" :toggle="toggleDrawer"></orders-filter-drawer> -->
    <div>
      <!-- customer status tabs -->

      <div class="flex px-3 py-2">
        <base-tab-button
          v-for="(value, key) in statusOptions"
          :key="key"
          :active="filter[key]"
          @click="toggleStatus(key)"
        >
          {{ value }}
        </base-tab-button>
        <!-- <base-tab-button :active="filter.isArchived" @click="toggleStatus('isArchived')"> Archived </base-tab-button>
        <base-tab-button :active="filter.isVerified" @click="toggleStatus('isVerified')"> Verified </base-tab-button> -->
      </div>

      <div class="flex py-3 px-5 justify-between flex-nowrap gap-2">
        <div class="text-lg rounded-md text-gray-400 border-2 py-1 px-2 w-full focus-within:border-blue-400">
          <font-awesome-icon icon="search" class="text-current mr-1"></font-awesome-icon>
          <input
            type="text"
            placeholder="search customer"
            class="w-11/12 text-gray-500 border-none focus:ring-transparent focus:border-none"
          />
        </div>
        <!-- <div class="flex items-center gap-3">
          <sort-dropdown-menu items="['name']" @sort="console.log('ss')"></sort-dropdown-menu>
          <button class="border border-gray-500 py-2 px-3 w-full text-sm" @click="toggleDrawer()">More Filters</button>
        </div> -->
      </div>

      <div v-if="loading">loading</div>
      <div v-else-if="error">
        {{ error }}
      </div>
      <div v-else>
        <customers-table :customers="customerNodes"></customers-table>
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
import BaseTabButton from './BaseTabButton.vue'
import OrdersFilterDrawer from './OrdersFilterDrawer.vue'
import VPagination from './BasePagination.vue'
import CustomersTable from './CustomersTable.vue'
import SortDropdownMenu from './SortDropdownMenu.vue'
import useCustomers from '../composables/useCustomers'

export default {
  components: {
    VCard,
    BaseTabButton,
    OrdersFilterDrawer,
    SortDropdownMenu,
    VCardFooter,
    CustomersTable,
    VPagination,
  },

  setup() {
    const { open, toggleDrawer } = useNavdrawer(true)

    return {
      ...useCustomers(),
      open,
      toggleDrawer,
    }
  },
}
</script>
