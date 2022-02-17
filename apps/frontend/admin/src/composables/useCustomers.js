import { reactive, computed, readonly } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { FetchCustomers } from 'graphql-client/admin/customers'

const defaultFilters = {
  first: 30,
  offset: 0,
}

const customerFilters = reactive({
  ...defaultFilters,
})

export const filterOptions = {
  paymentStatus: ['succeeded', 'processing', 'initiated', 'cancelled'],
  fulfillmentStatus: ['Unfulfilled', 'Fulfilled', 'PartiallyFulfilled'],
}

export default () => {
  const { result, loading, error } = useQuery(FetchCustomers, () => ({ ...customerFilters }))
  const customerNodes = useResult(result, [], data => data.customers.edges)
  const totalItems = useResult(result, 0, data => data.customers.totalItems)

  // sets the value for a single filtering atribute
  const setFilter = (key, value) => {
    customerFilters[key] = value
  }

  const setFilters = filterObject => {
    Object.keys(filterObject).forEach(key => {
      customerFilters[key] = filterObject[key]
    })
  }

  const loadPage = pageNo => {
    const offset = pageNo * customerFilters.first - customerFilters.first
    customerFilters.offset = offset
  }

  const resetFilters = () => {
    console.log('resetFilters')
    Object.keys(customerFilters).forEach(key => {
      customerFilters[key] = defaultFilters[key]
    })
  }
  const pageInfo = computed(() => {
    console.log(totalItems.value)
    const totalPages = Math.ceil(totalItems.value / customerFilters.first)
    const currentPage = Math.floor((customerFilters.offset + customerFilters.first) / customerFilters.first)

    return {
      totalPages,
      currentPage,
    }
  })

  return {
    customerNodes,
    setFilter,
    setFilters,
    loadPage,
    resetFilters,
    filter: readonly(customerFilters),
    error,
    loading,
    pageInfo,
    filterOptions,
  }
}
