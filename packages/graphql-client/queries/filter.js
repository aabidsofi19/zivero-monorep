import gql from 'graphql-tag'

export const fetchFilters = gql`
  query {
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
  }
`

export const fetchPopularCategories = gql`
  query {
    filters {
      categories {
        id
        name
      }
      genders
      brands {
        id
        name
      }
    }
  }
`

export const fetchCategories = gql`
  query {
    categories {
      name
      image
    }
  }
`

export const fetchBrands = gql`
  query {
    filters {
      brands {
        id
        logo
        name
      }
    }
  }
`

export const getProductCreateData = gql`
  query {
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
