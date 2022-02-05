import gql from 'graphql-tag'

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($ProductInput: ProductInput!) {
    createProduct(pd: $ProductInput) {
      product {
        id
      }
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: String!, $ProductInput: ProductInput!) {
    updateProduct(id: $id, pd: $ProductInput) {
      product {
        id
        name
        price
        quantity
        description
        discountPercent
        images
        status
        brand {
          id
          name
        }
        category {
          id
          name
        }
        variations {
          Id
          price
          discountPercent
          quantity
        }
      }
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      product {
        id
      }
    }
  }
`
