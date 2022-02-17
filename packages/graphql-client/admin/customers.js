import gql from 'graphql-tag'

export const FetchCustomers = gql`
  query customers($offset: Int, $first: Int, $userId: ID) {
    customers(offset: $offset, first: $first, user: $userId) {
      pageInfo {
        hasNextPage
        startCursor
      }
      edges {
        node {
          user {
            isActive
            username
            firstName
          }
          id
          phoneNumber
          isVerified
          verifiedBy
          joinedOn
        }
      }
    }
  }
`
