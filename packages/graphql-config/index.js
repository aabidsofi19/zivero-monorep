import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink ,concat ,fromPromise} from 'apollo-link';

import {refreshTokenFlow} from "auth"


export function createClient(store){

    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      console.log("auth middleware")
      console.log(store.state.user)
      var token = store.state.user.auth.token
      console.log("JWT",token)
      operation.setContext({
        headers: {
          Authorization: token ? `JWT ${token}` : null
        }
      })
    
      return forward(operation)
    })
    
    
    const errorLink = onError(
      ({ graphQLErrors,  operation, forward }) => {
        console.log("hey eror in request gql")
        if (graphQLErrors) {
          console.log("gql-errors",graphQLErrors)
          for (let err of graphQLErrors) {
            console.log(err.message,err.extensions)
            switch (err.message) {
              case "You do not have permission to perform this action" :
              case "You are not registerd as customer" :
              case "Signature has expired" :
                console.log("refreshing ")
                return fromPromise(
                refreshTokenFlow(store).catch((error) => {
                    // Handle token refresh errors e.g clear stored tokens, redirect to login
                    console.log("error while refresdhing",error)
                    router.push("/login")
                    return;
                  })
                )
                  .filter((value) => Boolean(value))
                  .flatMap((accessToken) => {
                    const oldHeaders = operation.getContext().headers;
                    // modify the operation context with a new token
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        Authorization: `JWT ${accessToken}`,
                      },
                    });
    
                    // retry the request, returning the new observable
                    console.log("forwarding")
                    return forward(operation);
                  });
            }
          }
        }
      }
    );
    

    const link = new HttpLink({
        uri: 'http://localhost:8000/graphql/',
        fetch,
        credentials: 'include',
        onError(err) {
            console.log(err)
      },
    });
    
    
    return new ApolloClient({
      link: errorLink.concat(concat(authMiddleware,link)),
      cache: new InMemoryCache({
        addTypename: true
      })
    });
  
}