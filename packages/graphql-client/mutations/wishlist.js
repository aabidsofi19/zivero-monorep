import gql from 'graphql-tag'

export const AddToWishlist = gql`
    mutation AddToWishlist($productId: String!) {
        addToWishlist(productId: $productId) {
            wishlist {
              id
            }
    }
}`


export const RemoveFromWishlist = gql`

    mutation RemoveFromWishlist($productId: String!) {
        removeFromWishlist(productId: $productId) {
            wishlist {
              id
            }
    }
}`

