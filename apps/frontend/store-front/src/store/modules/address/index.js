import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
} from "graphql-client/mutations/address";
import { fetchAddresses } from "graphql-client/queries/address";

import { client } from "../../../main";

const state = () => ({
  addresses: [],
  defaultAddress: {},
  addressToUpdate: {},
  selectedAddress: { id: null },
});

const mutations = {
  setAddresses(state, data) {
    state.addresses = data.addresses;
    state.defaultAddress = data.defaultAddress;
    state.selectedAddress = state.defaultAddress ?? {}; // setting the default address to be the selected address for the checkout
    if (state.defaultAddress) {
      state.defaultAddress.isPrimary = true;
    }
  },

  // setDefaultAddress(state,address){
  //     state.defaultAddress=address

  // },

  setAddressToUpdate(state, address) {
    state.addressToUpdate = address;
  },
  setSelectedAddress(state, address) {
    state.selectedAddress = address;
  },
};

const actions = {
  async fetchAddresses({ commit }) {
    let { loading, data } = await client.query({
      query: fetchAddresses,
      fetchPolicy: "no-cache",
    });

    commit("setAddresses", data);
    return loading;
  },

  // async fetchDefaultAddress({commit}){
  //     let result = await client.query({
  //         query:fetchDefaultAddress,
  //         fetchPolicy:"no-cache"
  //     })
  //
  //     commit('setDefaultAddress',result.data.defaultAddress)
  // },

  async addAddress({ dispatch, commit }, address) {
    //
    commit("app/SET_LOADING", true, { root: true });
    let result = await client.mutate({
      mutation: ADD_ADDRESS,
      variables: { address: { ...address } },
    });

    //
    if (result.data.addAddress.address.id) {
      let { loading } = await dispatch("fetchAddresses");
      commit("app/SET_LOADING", loading, { root: true });
      // dispatch("fetchDefaultAddress")
    }
    commit("app/SET_LOADING", result.loading, { root: true });
  },

  async updateAddress({ dispatch }, { addressId, updateValues }) {
    delete updateValues["id"];
    delete updateValues["__typename"];

    let result = await client.mutate({
      mutation: UPDATE_ADDRESS,
      variables: { addressId: addressId, updateValues: { ...updateValues } },
    });

    if (result.data.updateAddress.address.id) {
      dispatch("fetchAddresses");
      // dispatch("fetchDefaultAddress")
    }
  },

  async deleteAddress({ dispatch }, addressId) {
    let result = await client.mutate({
      mutation: DELETE_ADDRESS,
      variables: { addressId: addressId },
    });

    if (result.data.deleteAddress.success) {
      dispatch("fetchAddresses");
      // dispatch("fetchDefaultAddress")
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
