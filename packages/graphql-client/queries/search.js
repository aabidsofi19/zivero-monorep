import gql from 'graphql-tag'

export const AutoCompleteResults = gql`
  query AutoCompleteResults($search: String!) {
    productAutocompleteResults(search: $search) {
      id
      name
      images
      discountPercent
      price
    }
  }
`

export const SearchResults = gql`
  query SearchResults($search: String!, $pageNo: Int) {
    productSearchResults(search: $search, pageNo: $pageNo) {
      page
      totalResults
      totalPages
      results {
        id
        name
        brand
        category
        images
        discountPercent
        price

        variations {
          price
          discountPercent
          images
        }
      }
    }
  }
`
