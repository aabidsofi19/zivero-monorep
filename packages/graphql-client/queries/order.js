import gql from 'graphql-tag'

export const GetOrders = gql`
  query orders(
    $offset: Int
    $before: String
    $after: String
    $first: Int
    $last: Int
    $id: ID
    $paid: Boolean
    $paymentMethod: String
    $paymentStatus: String
    $fullfilmentStatus: String
    $createdAt: DateTime
    $updatedAt: DateTime
    $orderBy: String
  ) {
    orders(
      orderBy: $orderBy
      first: $first
      last: $last
      offset: $offset
      before: $before
      after: $after
      id: $id
      paid: $paid
      paymentMethod: $paymentMethod
      paymentStatus: $paymentStatus
      fullfilmentStatus: $fullfilmentStatus
      createdAt: $createdAt
      updatedAt: $updatedAt
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          deliveryCharges
          paymentStatus
          createdAt
          orderitemSet {
            id
            product {
              available
              brand {
                id
                name
              }
              name
            }
            variation {
              price
              images
            }
            amount
            totalAmount
            quantity
          }
        }
        cursor
      }
    }
  }
`

export const GetOrder = gql`
  query order($id: String, $getCurrent: Boolean!) {
    order(getCurrent: $getCurrent, id: $id) {
      id
      paid
      paymentStatus
      extraCharges
      paymentStatus
      createdAt
      orderitemSet {
        id
        product {
          available
          brand {
            id
            name
          }
          name
        }
        variation {
          price
          images
        }
        Amount
        totalAmount
        Quantity
      }
    }
  }
`
