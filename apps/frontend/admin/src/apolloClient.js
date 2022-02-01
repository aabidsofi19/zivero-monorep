/* eslint-disable object-curly-newline */
import { ApolloLink, createHttpLink, ApolloClient, fromPromise, InMemoryCache, concat } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'

// import store from './store'
import router from './router'

const refreshTokenFlow = async () => {
  console.log('refreshing ')
}

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  //   console.log('auth middleware')
  //   console.log(store.state.user)
  //   const token = store.state.user.auth.token
  //   console.log('JWT', token)
  //   operation.setContext({
  //     headers: {
  //       Authorization: token ? `JWT ${token}` : null,
  //     },
  //   })

  console.log('auth middleware')

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  console.log('hey eror in request gql')
  if (graphQLErrors) {
    console.log('gql-errors', graphQLErrors)

    graphQLErrors.forEach(({ message, extensions }) => {
      console.log(message, extensions)

      switch (message) {
        case 'You do not have permission to perform this action':
        case 'You are not registerd as customer':
        case 'Signature has expired':
          console.log('refreshing ')

          return fromPromise(
            refreshTokenFlow().catch(error => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
              console.log('error while refresdhing', error)
              router.push('/login')
            }),
          )
            .filter(value => Boolean(value))
            .flatMap(accessToken => {
              const oldHeaders = operation.getContext().headers

              // modify the operation context with a new token
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  Authorization: `JWT ${accessToken}`,
                },
              })

              // retry the request, returning the new observable
              console.log('forwarding')

              return forward(operation)
            })

        default:
          return null
      }
    })
  }
})

const link = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
  fetch,
  credentials: 'include',
  onError(err) {
    console.log(err)
  },
})

export default new ApolloClient({
  link: errorLink.concat(concat(authMiddleware, link)),
  cache: new InMemoryCache({
    addTypename: true,
  }),
})
