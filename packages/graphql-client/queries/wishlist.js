import gql from 'graphql-tag'

export const FetchWishlist = gql`
  query FetchWishlist {
    wishlist {
      id

      products {
        id
        price
        discountPercent
        images
        name
        description
      }
    }
  }
`
