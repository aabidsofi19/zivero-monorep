import gql from 'graphql-tag'

export const GetOverviewStats = gql`
  query overviewStats {
    unfulfilledOrders: orders(fulfillmentStatus: "Unfulfilled") {
      totalItems
    }
    totalSales: orders(paymentStatus: "succeeded") {
      edges {
        node {
          totalAmount
        }
      }
    }
    customers {
      totalItems
    }
    Products(filter: { status: "active" }) {
      totalProducts
    }
  }
`
