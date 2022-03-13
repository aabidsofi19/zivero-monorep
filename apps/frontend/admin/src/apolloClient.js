/* eslint-disable object-curly-newline */
import { authState, useRefreshToken } from './composables/useUser'
import { ApolloLink, createHttpLink, ApolloClient, fromPromise, InMemoryCache, concat } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'

import { getBaseUrl } from 'utils'
// import store from './store'
import { useRouter } from 'vue-router'

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: authState.access_token ? `JWT ${authState.access_token}` : null,
    },
  })

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  //console.log("hey eror in request gql");
  const { refreshToken, success } = useRefreshToken()
  if (graphQLErrors) {
    //console.log("gql-errors", graphQLErrors);
    for (let err of graphQLErrors) {
      //console.log(err.message, err.extensions);
      switch (err.message) {
        case 'You do not have permission to perform this action':

        case 'Signature has expired':
          console.log('refreshing ', operation.operationName)
          return fromPromise(
            refreshToken().then(accessToken => {
              console.log('token', accessToken)
              if (!accessToken) {
                // Handle token refresh errors e.g clear stored tokens, redirect to login
                console.log('error while refresdhing')
                window.location.replace('/#/login')
              }
              return forward(operation)
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
              console.log('forwarding', operation)
              return forward(operation)
            })
      }
    }
  }
})

const link = createHttpLink({
  // uri: 'https://zivero.herokuapp.com/graphql/',
  uri: getBaseUrl(),
  fetch,
  credentials: 'include',
  onError(err) {
    //console.log(err)
  },
})

export default new ApolloClient({
  link: errorLink.concat(concat(authMiddleware, link)),
  cache: new InMemoryCache({
    addTypename: true,
  }),
})
