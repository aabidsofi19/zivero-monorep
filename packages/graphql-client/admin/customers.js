import gql from 'graphql-tag'

export const FetchCustomers = gql`
  query customers(
    $offset: Int
    $first: Int
    $userId: ID
    $isActive: Boolean
    $isArchived: Boolean
    $isVerified: Boolean
  ) {
    customers(
      offset: $offset
      first: $first
      user: $userId
      user_Status_Verified: $isVerified
      user_Status_Archived: $isArchived
      user_IsActive: $isActive
    ) {
      pageInfo {
        hasNextPage
        startCursor
      }
      edges {
        node {
          user {
            isActive
            status {
              verified
              archived
            }
            username
            firstName
          }
          id
          phoneNumber
          joinedOn
        }
      }
    }
  }
`
