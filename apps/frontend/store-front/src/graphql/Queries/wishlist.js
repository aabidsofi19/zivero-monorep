import gql from "graphql-tag";

export const FetchWishlist = gql`
  query FetchWishlist {
    wishlist {
      id

      products {
        id
        name
        price
        images
        discountPercent
      }
    }
  }
`;
