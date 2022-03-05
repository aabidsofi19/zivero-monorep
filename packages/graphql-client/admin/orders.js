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
    $fulfillmentStatus: String
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
      fulfillmentStatus: $fulfillmentStatus
      createdAt: $createdAt
      updatedAt: $updatedAt
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalItems
      edges {
        node {
          id
          createdAt
          paymentStatus
          createdAt
          fulfillmentStatus
          totalAmount
          customer {
            user {
              username
            }
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
      fulfillmentStatus
      shippingCharges
      taxPercent
      discountPercent
      paymentStatus
      createdAt
      updatedAt
      totalAmount
      customer {
        user {
          username
        }
      }
      address {
        name
        pincode
        state
        country
        city
        town
        apartmentNo
        isWork
        isHome
        phoneNumber
      }
      orderitemSet {
        id
        product {
          id
          images
          available
          brand {
            id
            name
          }
          name
        }
        variation {
          price
          variant {
            name
            value
          }
          images
        }
        amount
        totalAmount
        quantity
      }
    }
  }
`

export const UpdateOrder = gql`
  mutation updateOrder($id: String!, $fulfillmentStatus: String) {
    updateOrder(orderId: $id, fulfillmentStatus: $fulfillmentStatus) {
      order {
        fulfillmentStatus
        id
      }
    }
  }
`

export const GetSales = gql`
  query getSales($createdAt_Lte: DateTime!, $createdAt_Gte: DateTime!) {
    orders(createdAt_Gte: $createdAt_Gte, createdAt_Lte: $createdAt_Lte, paymentStatus: "succeeded") {
      edges {
        node {
          id
          createdAt
          totalAmount
        }
      }
    }
  }
`
