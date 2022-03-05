import { ref } from 'vue'
import { GET_PRODUCTS_QUERY } from 'graphql-client/queries/productQueries'
import { useQuery, useResult } from '@vue/apollo-composable'

import useFilters from './useFilters'

export const pageNo = ref(1)

export default () => {
  const { filterState } = useFilters()

  // destructuring removes reactivity
  // eslint-disable-next-line prefer-destructuring
  //   const filterInput = filterState.filterInput

  const { loading, error, result } = useQuery(GET_PRODUCTS_QUERY, () => ({
    page: pageNo.value,
    filter: filterState.value.filterInput,
  }))

  const products = useResult(result, [], data => data.Products.products)

  // const totalPages = ref(1)
  const pagination = ref(1)
  const totalPages = useResult(result, pagination, data => {
    pagination.value = data.Products.totalPages

    return data.Products.totalPages
  })

  const loadPage = page => {
    //console.log('loadinf', page)
    pageNo.value = page
  }

  return {
    result,
    loading,
    error,
    products,
    totalPages,
    currentPage: pageNo,
    loadPage,
  }
}
