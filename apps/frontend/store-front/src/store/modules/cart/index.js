import { client } from "../../../main";
import { AddToCart, UPDATE_CART } from "graphql-client/mutations/cart";
import { getCart } from "graphql-client/queries/cart";
const state = () => ({
  cart: {
    cartLength: 0,
  },
});

const mutations = {
  addToCart(state, details) {
    state.cart = details;
  },

  updateCart(state, details) {
    state.cart = details;
  },
};
const actions = {
  async addToCart({ commit }, details) {
    let { data, loading, errors } = await client.mutate({
      mutation: AddToCart,
      variables: {
        productId: details.productId,
        variationId: details.variationId,
        quantity: details.quantity,
      },
    });

    let cart = data.AddToCart.cart;

    commit("addToCart", cart);
    return { loading, errors };
  },

  async updateCart({ commit }, details) {
    commit("app/SET_LOADING", true, { root: true });
    let result = await client.mutate({
      mutation: UPDATE_CART,
      variables: {
        productId: details.productId,
        variationId: details.variationId,
        quantity: details.quantity,
      },
    });
    commit("app/SET_LOADING", result.loading, { root: true });

    let cart = result.data.UpdateCart.cart;
    commit("updateCart", cart);
  },

  async fetchCart({ commit }) {
    let result = await client.query({
      query: getCart,
      fetchPolicy: "no-cache",
    });
    commit("addToCart", result.data.cart);
    return result.loading;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
