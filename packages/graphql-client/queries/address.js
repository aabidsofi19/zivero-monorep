import gql from 'graphql-tag';

const fetchAddresses = gql`
query{

  addresses{
    ...addressFields
  }
  
  defaultAddress {
    ...addressFields
  }
}
fragment addressFields on AddressType{
    id
    name
    phoneNumber
    pincode
    apartmentNo
    city
    town
    state
    isWork
    isHome
}
`

// const fetchDefaultAddress = gql`
// query{
// defaultAddress{
//     id
//     name
//     phoneNumber
//     pincode
//     apartmentNo
//     city
//     town
//     state
//     isWork
//     isHome
//   }
// }
// `
export {fetchAddresses}