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
  const { refreshToken, success } = useRefreshToken()
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.message) {
        case 'You do not have permission to perform this action':

        case 'Signature has expired':
          return fromPromise(
            refreshToken().then(accessToken => {
              if (!accessToken) {
                // Handle token refresh errors e.g clear stored tokens, redirect to login

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
  onError(err) {},
})

export default new ApolloClient({
  link: errorLink.concat(concat(authMiddleware, link)),
  cache: new InMemoryCache({
    addTypename: true,
  }),
})
