import gql from 'graphql-tag'

export const GET_PRODUCTS_QUERY = gql`
  query Product($filter: FilterInput, $page: Int!) {
    Products(filter: $filter, pageNb: $page) {
      totalPages
      totalProducts
      pageNo
      products {
        id
        name
        description
        brand {
          id
          name
        }
        category {
          name
          id
        }
        status
        images
        variations {
          Id
          price
          discountPercent
          images
          variant {
            name
            value
          }
        }
      }
    }
  }
`
export const GET_PRODUCT_QUERY = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      description
      brand {
        id
        name
      }
      category {
        name
        id
      }
      availableVariants

      variations {
        Id
        price
        discountPercent
        images
        variant {
          name
          value
        }
      }
    }
  }
`
export const GET_CATEGORIES = gql`
  query {
    categories {
      name
      description
      id
    }
  }
`

export const GET_PRODUCT_EDIT_DATA = gql`
  query getProductEditData($id: String!) {
    product(id: $id) {
      id
      name
      description
      status
      price
      discountPercent
      images
      quantity
      gender
      brand {
        id
        name
      }
      category {
        name
        id
      }
      availableVariants
      variations {
        price
        discountPercent
        quantity
        variant {
          id
        }
      }
    }

    filters {
      genders
      categories {
        id
        name
      }
      variationFilters {
        filter
        values
      }
      brands {
        id
        name
      }
      tags
    }

    variants {
      id
      name
      value
    }
  }
`
