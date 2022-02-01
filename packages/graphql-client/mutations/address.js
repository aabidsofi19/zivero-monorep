import gql from "graphql-tag";

const ADD_ADDRESS = gql`
mutation addAddress($address:AddressInput){
    addAddress(address:$address){
        address{
            id
        }
    }
}
`

const UPDATE_ADDRESS = gql`

mutation updateAddress($addressId:String!,$updateValues:AddressInput!){
    updateAddress(addressId:$addressId,updateValues:$updateValues){
        address{
            id
        }
    }
}
`

const DELETE_ADDRESS =gql`
mutation deleteAddress($addressId:String!){
    deleteAddress(addressId:$addressId){
        success
    }
}
`

export {ADD_ADDRESS,UPDATE_ADDRESS,DELETE_ADDRESS}