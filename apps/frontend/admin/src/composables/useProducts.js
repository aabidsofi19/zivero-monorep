import { ref, watchEffect } from 'vue'
import { GET_PRODUCTS_QUERY } from 'graphql-client/queries/productQueries'
import { useQuery, useResult } from '@vue/apollo-composable'

import useFilters from './useFilters'

export const pageNo = ref(1)

export default () => {
  const { filterState } = useFilters()

  // destructuring removes reactivity
  // eslint-disable-next-line prefer-destructuring
  //   const filterInput = filterState.filterInput

  const { loading, error, result, variables, onResult } = useQuery(GET_PRODUCTS_QUERY, () => ({
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
  // implementing total pages this way breaks rectivity of variables

  const loadPage = page => {
    console.log('loadinf', page)
    pageNo.value = page

    // variables.value = {
    //   page: pageNo.value,
    //   filter: filterInput.value,~
    // }
    // variables.value.page = page
  }

  //   watchEffect(() => {
  //     console.log('refetching', pageNo.value)
  //     variables.value = {
  //       page: pageNo.value,
  //       filter: filterInput.value,
  //     }
  //   })

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
