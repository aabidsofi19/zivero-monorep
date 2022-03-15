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
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import VueLogger from "vuejs-logger";
const isProduction = process.env.NODE_ENV === "production";

const options = {
  isEnabled: true,
  logLevel: isProduction ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};

const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8000/graphql/"
    : "https://zivero.herokuapp.com/graphql/";
};

Vue.use(CoolLightBox);
//

Vue.use(VueLogger, options);
Vue.use(VueApollo);
Vue.use(VueSanitize);

//auth middle ware
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  var token = store.state.user.auth.token;

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
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.message) {
        case "You do not have permission to perform this action":
        case "You are not registerd as customer":
        case "Signature has expired":
          return fromPromise(
            // TODO redirect to login on refresh error
            refreshTokenFlow()
              .then((token) => {
                if (!token) {
                  localStorage.removeItem("Zivero_refresh_token");
                  router.push("/login");
                }
              })

              .catch(() => {
                // Handle token refresh errors e.g clear stored tokens, redirect to login

                localStorage.removeItem("Zivero_refresh_token");
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

              return forward(operation);
            });
      }
    }
  }
});

const link = new HttpLink({
  uri: getBaseUrl(),
  fetch,
  credentials: "include",
});

export const client = new ApolloClient({
  link: errorLink.concat(concat(authMiddleware, link)),
  cache: new InMemoryCache({
    addTypename: true,
  }),
  credentials: "include",
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
