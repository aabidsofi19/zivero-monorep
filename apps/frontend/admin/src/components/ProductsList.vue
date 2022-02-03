<template>
  <v-card outlined class="p-0">
    <product-filter-drawer :is-open="open" :toggle="toggleDrawer"></product-filter-drawer>
    <div>
      <!-- product status tabs -->
      <div class="flex px-5 pt-3 border-b-2">
        <div v-for="category in categories" :key="category">
          <button
            class="transition-all duration-100 ease-in-out transform hover:scale-110"
            :class="[
              'mr-8 m-0 py-2.5 text-sm leading-5 font-medium text-gray-500  ',

              selected == category
                ? 'border-b-4 border-green-800 font-bold text-black'
                : 'border-b-4 border-transparent',
            ]"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="flex py-3 px-5 justify-between flex-nowrap gap-3">
        <div class="text-lg rounded-md text-gray-400 border-2 py-1 px-2 w-4/5 focus-within:border-blue-400">
          <font-awesome-icon icon="search" class="text-current mr-1"></font-awesome-icon>
          <input
            type="text"
            placeholder="filter products"
            class="w-11/12 text-gray-500 border-none focus:ring-transparent focus:border-none"
          />
        </div>

        <button class="border-2 py-1 px-3 text-sm" @click="toggleDrawer()">More Filters</button>
      </div>

      <div v-if="!loading">
        <products-table :products="products"></products-table>
      </div>
    </div>
    <v-card-footer>
      <v-pagination :total-pages="totalPages" :current-page="currentPage" @goToPage="loadPage"></v-pagination>
    </v-card-footer>
  </v-card>
</template>

<script>
import { ref } from 'vue'

import useProducts from '../composables/useProducts'
import useNavdrawer from '../composables/useNavdrawer'
import { VCard, VCardFooter } from './AppCard.vue'
import ProductFilterDrawer from './ProductsFilterDrawer.vue'
import VPagination from './BasePagination.vue'
import ProductsTable from './ProductsListTable.vue'

export default {
  components: {
    VCard,
    ProductFilterDrawer,
    VCardFooter,
    ProductsTable,
    VPagination,
  },

  setup() {
    const { open, toggleDrawer } = useNavdrawer(true)
    const selected = ref('Recent')
    const categories = ref(['active', 'drafted', 'archived'])
    const selectCategory = category => {
      selected.value = category
    }
    const { products, totalPages, loading, error, currentPage, loadPage } = useProducts()

    return {
      categories,
      selected,
      selectCategory,
      open,
      toggleDrawer,
      loading,
      error,
      products,
      totalPages,
      currentPage,
      loadPage,
    }
  },
}
</script>
