import { client } from "../../main";
import { checkoutSecret } from "../../graphql/Queries/checkout";

const state = () => ({
  checkoutSecret: null,
  shippingCharges: 0,
});

const actions = {
  async fetchCheckoutSecret({ commit }) {
    let result = client.query({
      query: checkoutSecret,
      fetchPolicy: "no-cache",
    });

    let secret = (await result).data.checkoutSecret.checkoutSecret;
    commit("setCheckoutSecret", secret);
    return secret;
  },
};

const mutations = {
  setCheckoutSecret(state, data) {
    state.checkoutSecret = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
