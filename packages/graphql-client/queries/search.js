import gql from 'graphql-tag'

export const AutoCompleteResults = gql`
  query AutoCompleteResults($search: String!) {
    productAutocompleteResults(search: $search) {
      Id
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
        Id
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
