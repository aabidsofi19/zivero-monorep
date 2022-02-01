import gql from 'graphql-tag'

export const CreateOrder= gql`
mutation createOrder($input:OrderInput){
    createOrder(input:$input){
        order{
            id
            paymentId
        }
        orderItems{
            id
            productId
            variationId
            Quantity
            Amount
            product{
                id
                name
                brand{
                    id
                    name
                }

            }
            variation{
                available
                price
                images
                variant{
                    name
                    value
                }
            }

        }
    }
}
`

// export const checkoutSecret =gql`
    
// `
