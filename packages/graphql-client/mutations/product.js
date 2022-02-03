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

export const Create = ''
