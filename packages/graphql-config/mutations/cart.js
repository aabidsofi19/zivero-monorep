//import {gql} from 'graphql-tag'
import gql from 'graphql-tag';


export const AddToCart= gql`mutation 
AddToCart($productId:String!, $variationId:String! , $quantity:Int!){

  AddToCart(productdetails:{
    productId:$productId
    variationId:$variationId
    quantity:$quantity
  }){
      cart{
        cartLength
      }
    }
}
`

export const UPDATE_CART= gql`

mutation UpdateCart($productId:String!, $variationId:String! , $quantity:Int!){
  UpdateCart(Input:{productId:$productId,variationId:$variationId,quantity:$quantity}){
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
        }
        variation{
          Id
          discountPercent
          images
          price
          variant {
            name
            value
          }
        }
      }
    }
  }
}
      
`


