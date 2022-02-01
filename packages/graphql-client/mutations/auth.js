import gql from 'graphql-tag';

export const LOGIN_EMAIL=gql`
mutation login($password:String!,$email:String!){
  tokenAuth(password:$password, email: $email) {
    token
    refreshToken
    user {
      id
      username
      email
      verified
      firstName
      lastName
      lastLogin
    }
  }
}

`

export const LOGIN_USERNAME=gql`
mutation tokenAuth($username: String! $password: String! )
{
    tokenAuth(password:$password, username: $username) {
        token
        refreshToken
        user {
          id
          username
          email
          verified
          firstName
          lastName
        }
    }
}
`
export const REGISTER_USER=gql`
mutation register( 
    $email:String!,
    $username:String!
    $password1:String! ,
    $password2:String!
)
{
    register(
         
        email: $email, 
        isCustomer: true,
        password1:$password1, 
        password2:$password2,
        username:$username,
    ) 
    {
        success
        errors
        token
        refreshToken
    }

}
`

export const VERIFY_TOKEN=gql`
mutation verifyToken($token:String!){
	verifyToken(token:$token){
    success
    errors
  }
}`


export const REFRESH_TOKEN=gql`
mutation  refreshToken($refreshToken:String!) {
  refreshToken(refreshToken:$refreshToken){
     
    token
     success
     errors
     refreshToken
    
  }
}
`

export const REVOKE_TOKEN = gql`
mutation revokeToken($refreshtoken:String!){
    revokeToken(refreshToken: $refreshtoken) {
      revoked
      success
      errors
    }
}
`


export const VERIFY_ACCOUNT=gql`
mutation verifyAccount($token:String!){
  verifyAccount(token:$token){
    success
    errors
  }
}
`
export const FORGOT_PASSWORD = gql`
  mutation  sendPasswordResetEmail($email: String!){
    sendPasswordResetEmail(email: $email) {
      success
      errors
    }
  }
`

export const RESET_PASSWORD =gql`
mutation passwordReset($newPassword1:String!,$newPassword2:String!,$token:String!) {
  passwordReset(newPassword1:$newPassword1,newPassword2: $newPassword2,token: $token) {
    success
    errors
  }
} 

`

export const RESEND_ACTIVATION_EMAIL =gql`
mutation resendActivationEmail($email:String!){
  resendActivationEmail(email: $email) {
    success
    errors
  }
}`