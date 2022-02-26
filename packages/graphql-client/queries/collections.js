import gql from 'graphql-tag'

export const getCategories = gql`
  query categories {
    categories {
      id
      brands {
        id
        name
      }
      description
      genders
      image
      name
    }
  }
`
export const getBrands = gql`
  query brands {
    brands {
      id
      name
    }
  }
`
