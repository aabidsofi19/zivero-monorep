import gql from 'graphql-tag'

export const ME_QUERY= gql`
query me{
    me{
        id
        lastLogin
        username
        firstName
        email
        
        verified
    }
}
`
