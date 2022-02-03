import { reactive, readonly, ref } from 'vue'
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

  // const setInputFilter = (type, value) => {
  //   filterState.filterInput[type] = value
  // }

  const setInputFilter = filter => {
    filterState.value.filterInput = filter
  }

  return {
    fetchFilters: getFilters,
    filterState,
    setInputFilter,
  }
}

export default useFilters
