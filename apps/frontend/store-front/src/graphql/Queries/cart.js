import gql from 'graphql-tag';


export const getCart= gql`query 
cart
{
    cart{
      cartLength
      totalPrice
      products{
        price
        quantity
        totalPrice
        product {
          id
          brand{
            id
            name
          }
          name
        }
        variation{
          Id
          images
          price
          discountPercent
          variant {
            name
            value
          }
          }
        }
      
    }
}
`
