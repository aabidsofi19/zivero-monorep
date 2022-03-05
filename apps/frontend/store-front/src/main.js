import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
//import Vuex from "vuex";
import router from "./router";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import VueApollo from "vue-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink, concat, fromPromise } from "apollo-link";

import { refreshTokenFlow } from "./auth";
import store from "@/store";

import VueSanitize from "vue-sanitize";

// //console.log("happy coding")

Vue.use(VueApollo);
Vue.use(VueSanitize);

//auth middle ware
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  //console.log("auth middleware");
  //console.log(store.state.user);
  var token = store.state.user.auth.token;
  //console.log("JWT", token);
  operation.setContext({
    headers: {
      Authorization: token ? `JWT ${token}` : null,
    },
  });

  return forward(operation);
});
//apollo config
// Create an http link:

// const logoutLink = onError(({ networkError }) => {
//  if (networkError.statusCode === 401) logOut();
// })

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  //console.log("hey eror in request gql");
  if (graphQLErrors) {
    //console.log("gql-errors", graphQLErrors);
    for (let err of graphQLErrors) {
      //console.log(err.message, err.extensions);
      switch (err.message) {
        case "You do not have permission to perform this action":
        case "You are not registerd as customer":
        case "Signature has expired":
          //console.log("refreshing ");
          return fromPromise(
            refreshTokenFlow().catch((error) => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
              //console.log("error while refresdhing", error);
              router.push("/login");
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
              //console.log("forwarding");
              return forward(operation);
            });
      }
    }
  }
});

const link = new HttpLink({
  uri: "http://localhost:8000/graphql/",
  fetch,
  credentials: "include",
  onError(err) {
    //console.log(err);
  },
});

export const client = new ApolloClient({
  link: errorLink.concat(concat(authMiddleware, link)),
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: client,
});

new Vue({
  store,
  router,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
