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
    //console.log("fetching");
    let { loading, data } = await client.query({
      query: fetchAddresses,
      fetchPolicy: "no-cache",
    });
    //console.log("addresses", data);
    commit("setAddresses", data);
    return loading;
  },

  // async fetchDefaultAddress({commit}){
  //     let result = await client.query({
  //         query:fetchDefaultAddress,
  //         fetchPolicy:"no-cache"
  //     })
  //     //console.log("default",result)
  //     commit('setDefaultAddress',result.data.defaultAddress)
  // },

  async addAddress({ dispatch, commit }, address) {
    // //console.log("adding",address)
    commit("app/SET_LOADING", true, { root: true });
    let result = await client.mutate({
      mutation: ADD_ADDRESS,
      variables: { address: { ...address } },
    });

    // //console.log("add address",result)
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

    //console.log("addressID", addressId);
    //console.log("address", updateValues);
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
    //console.log("id", addressId);
    let result = await client.mutate({
      mutation: DELETE_ADDRESS,
      variables: { addressId: addressId },
    });
    //console.log("res", result);
    if (result.data.deleteAddress.success) {
      //console.log("fetching");
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
