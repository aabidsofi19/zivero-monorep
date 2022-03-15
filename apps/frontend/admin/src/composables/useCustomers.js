import { reactive, computed, readonly } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { FetchCustomers } from 'graphql-client/admin/customers'

const defaultFilters = {
  first: 30,
  offset: 0,
  // isVerified: true,
  // isArchived: false,
  // isActive: true,
}

const customerFilters = reactive({
  ...defaultFilters,
})

const statusOptions = {
  isActive: 'Active',
  isVerified: 'Verified',
  isArchived: 'Archived',
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
    Object.keys(customerFilters).forEach(key => {
      customerFilters[key] = defaultFilters[key]
    })
  }

  const toggleStatus = key => {
    if (['isActive', 'isVerified', 'isArchived'].includes(key)) {
      // customerFilters[key] = !customerFilters[key]
      if (customerFilters[key]) {
        setFilter(key, null)
      } else {
        setFilter(key, true)
      }
    }
  }

  const pageInfo = computed(() => {
    const totalPages = Math.ceil(totalItems.value / customerFilters.first)
    const currentPage = Math.floor((customerFilters.offset + customerFilters.first) / customerFilters.first)

    return {
      totalPages,
      currentPage,
    }
  })

  return {
    customerNodes,

    toggleStatus,
    setFilter,
    setFilters,
    loadPage,
    resetFilters,
    filter: readonly(customerFilters),
    statusOptions,
    error,
    loading,
    pageInfo,
  }
}
