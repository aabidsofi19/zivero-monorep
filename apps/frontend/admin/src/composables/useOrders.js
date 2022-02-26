import { reactive, computed, readonly } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GetOrders } from 'graphql-client/admin/orders'

const defaultFilters = {
  orderBy: null,
  first: 30,
  offset: 0,
  id: null,
  paid: null,
  paymentMethod: null,
  paymentStatus: null,
  fulfillmentStatus: null,
  createdAt: null,
  updatedAt: null,
  orderBy: '-createdAt',
}

export const sortOptions = [
  {
    title: 'Newest',
    value: '-created_at',
  },
  {
    title: 'Oldest',
    value: 'created_at',
  },
]

const ordersFilter = reactive({
  ...defaultFilters,
})

export const filterOptions = {
  paymentStatus: ['succeeded', 'processing', 'initiated', 'cancelled'],
  fulfillmentStatus: ['Unfulfilled', 'Fulfilled', 'PartiallyFulfilled'],
}

export default () => {
  const { result, loading, error } = useQuery(GetOrders, () => ({ ...ordersFilter }))
  const orderNodes = useResult(result, [], data => data.orders.edges)
  const totalItems = useResult(result, 0, data => data.orders.totalItems)

  // sets the value for a single filtering atribute
  const setFilter = (key, value) => {
    ordersFilter[key] = value
  }

  const setFilters = filterObject => {
    Object.keys(filterObject).forEach(key => {
      ordersFilter[key] = filterObject[key]
    })
  }

  const loadPage = pageNo => {
    const offset = pageNo * ordersFilter.first - ordersFilter.first
    ordersFilter.offset = offset
  }

  const resetFilters = () => {
    console.log('resetFilters')
    Object.keys(ordersFilter).forEach(key => {
      ordersFilter[key] = defaultFilters[key]
    })
  }

  const setSort = sort => {
    ordersFilter.orderBy = sort
  }

  const pageInfo = computed(() => {
    console.log(totalItems.value)
    const totalPages = Math.ceil(totalItems.value / ordersFilter.first)
    const currentPage = Math.floor((ordersFilter.offset + ordersFilter.first) / ordersFilter.first)

    return {
      totalPages,
      currentPage,
    }
  })

  const sortedBy = computed(() => {
    const { orderBy } = ordersFilter
    return orderBy
  })

  return {
    orderNodes,
    sortedBy,
    setSort,
    setFilter,
    setFilters,
    loadPage,
    resetFilters,
    filter: readonly(ordersFilter),
    error,
    loading,
    pageInfo,
    filterOptions,
  }
}
