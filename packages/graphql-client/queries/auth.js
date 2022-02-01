import gql from 'graphql-tag';

export const GET_CUSTOMER=gql`
query {
  customer{
    user{
      username
      email
      firstName
      lastName
      verified
      
    }
    phoneNumber
    
  }
}`



