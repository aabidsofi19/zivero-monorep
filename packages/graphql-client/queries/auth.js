import gql from 'graphql-tag'

export const GET_CUSTOMER = gql`
  query {
    customer {
      user {
        username
        email
        firstName
        lastName
        verified
      }
      phoneNumber
    }
  }
`

export const ME_QUERY = gql`
  query me {
    me {
      id
      lastLogin
      username
      firstName
      email
      verified
    }
  }
`
