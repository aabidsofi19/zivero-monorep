import gql from 'graphql-tag';

export const FetchWishlist = gql`
    query FetchWishlist {
        wishlist {
            id
            
            products {
                id
                name
                description
                variations {
                  available
                  discountPercent
                  price
                  images 
                }
            }
        }
    }
`
