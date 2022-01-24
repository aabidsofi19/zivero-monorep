import gql from "graphql-tag";

const  checkoutSecret = gql`
    query {
    checkoutSecret{
        checkoutSecret
    }
}
`

export {checkoutSecret}