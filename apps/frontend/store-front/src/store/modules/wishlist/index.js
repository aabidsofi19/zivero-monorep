import { client } from "../../../main";
import { FetchWishlist } from "graphql-client/queries/wishlist";
import {
  AddToWishlist,
  RemoveFromWishlist,
} from "graphql-client/mutations/wishlist";

const state = () => ({
  wishlist: {
    id: "",
    products: [],
    totalItems: 0,
  },
});

const actions = {
  async fetchWishlist({ commit }) {
    try {
      const { data } = await client.query({
        query: FetchWishlist,
        fetchPolicy: "no-cache",
      });
      commit("setWishlist", data.wishlist);
    } catch (error) {
      console.log(error);
    }
  },

  async addToWishlist({ dispatch }, productId) {
    try {
      await client.mutate({
        mutation: AddToWishlist,
        variables: { productId },
      });
      await dispatch("fetchWishlist");
    } catch (error) {
      console.log(error);
    }
  },

  async removeFromWishlist({ dispatch }, productId) {
    try {
      await client.mutate({
        mutation: RemoveFromWishlist,
        variables: { productId },
      });
      await dispatch("fetchWishlist");
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setWishlist(state, wishlist) {
    state.wishlist = wishlist;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
