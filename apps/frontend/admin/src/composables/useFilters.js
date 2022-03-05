import { readonly, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { fetchFilters } from 'graphql-client/queries/filter'

const defaultFilterInput = {
  categories: null,
  gender: '',
  brands: null,
  sortBy: 'BetterDiscount',
}
const filterState = ref({
  filterInput: {
    categories: null,
    gender: '',
    brands: null,
    sortBy: 'BetterDiscount',
    status: 'active',
  },
  variantFilterInput: [
    //    {
    //        name:"size",
    //        values:["xl","l"]
    //    }
  ],

  // sorting options not mutating this anywhere
  sortingOptions: [
    { title: 'Popularity', value: 'Popularity' },
    { title: 'Whats New', value: 'WhatsNew' },
    { title: 'Better Discount', value: 'BetterDiscount' },
    { title: 'Price : Low to High', value: 'PriceLowToHigh' },
    { title: 'Price : High to Low', value: 'PriceHighToLow' },
  ],

  // state variables products page
  isFiltering: false,
})

const useFilters = () => {
  const getFilters = () => useQuery(fetchFilters, filterState.value.filterInput)

  const setInputFilter = filter => {
    filterState.value.filterInput = filter
  }

  const setSortBy = sortBy => {
    //console.log('setting', sortBy)
    filterState.value.filterInput.sortBy = sortBy
  }

  const setStatus = status => {
    filterState.value.filterInput.status = status
  }

  const clearFilters = () => {
    filterState.value.filterInput = defaultFilterInput
    filterState.value.variantFilterInput = []
  }

  return {
    fetchFilters: getFilters,
    filterState: readonly(filterState),
    setInputFilter,
    setSortBy,
    setStatus,
    clearFilters,
  }
}

export default useFilters
