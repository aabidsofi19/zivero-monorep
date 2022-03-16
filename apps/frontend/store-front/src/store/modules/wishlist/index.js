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
    const { data, error, loading } = await client.query({
      query: FetchWishlist,
      fetchPolicy: "no-cache",
    });
    commit("setWishlist", data.wishlist);
    return { data, error, loading };
  },

  async addToWishlist({ dispatch }, productId) {
    
      await client.mutate({
        mutation: AddToWishlist,
        variables: { productId },
      });
      await dispatch("fetchWishlist");
    
  },

  async removeFromWishlist({ dispatch }, productId) {
    
      await client.mutate({
        mutation: RemoveFromWishlist,
        variables: { productId },
      });
      await dispatch("fetchWishlist");
    
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
