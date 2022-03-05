import { CreateOrder } from "graphql-client/mutations/order";
import { GetOrders, GetOrder } from "graphql-client/queries/order";

import { client } from "../../../main";
const state = () => ({
  activeOrder: {},
  orders: [],
});

const getters = {
  orderItemImage: () => (product, variation) => {
    if (variation.images.length > 0) {
      return variation.images[0];
    } else {
      return product.images[0];
    }
  },

  totalOrderAmount: () => (order) => {
    //console.log(order);
    return (
      order.extraCharges +
      order.orderitemSet.reduce((total, item) => {
        return total + item.totalAmount;
      }, 0)
    );
  },
};

const actions = {
  async createOrder({ rootState, commit }) {
    //console.log("rootstate", rootState);
    let selectedAddress = rootState.addresses.selectedAddress;
    let orderInput = {
      addressId: selectedAddress.id,
      isPrimary: selectedAddress.isPrimary,
    };

    let { loading, data, errors } = await client.mutate({
      mutation: CreateOrder,
      variables: { input: { ...orderInput } },
    });

    let orderData = data.createOrder;
    commit("setActiveOrder", orderData);

    return { loading, errors };
  },
  async fetchActiveOrder({ commit }) {
    let { loading, data } = await client.query({
      query: GetOrder,
      variables: { getCurrent: true },
      fetchPolicy: "no-cache",
    });
    let orderData = data.order;
    commit("setActiveOrder", orderData);
    return loading;
  },

  async fetchOrders({ commit }, filter) {
    let { loading, data } = await client.query({
      query: GetOrders,
      variables: {
        ...filter,
      },
    });

    commit("setOrders", data.orders);
    return loading;
  },

  async fetchMoreOrders({ commit }, filter) {
    let { loading, data } = await client.query({
      query: GetOrders,
      variables: {
        ...filter,
      },
    });
    commit("addMoreOrders", data.orders);
    return loading;
  },
};

const mutations = {
  setActiveOrder(state, data) {
    state.activeOrder = data;
  },
  setOrders(state, data) {
    state.orders = data;
  },
  addMoreOrders(state, { pageInfo, edges }) {
    state.orders.pageInfo = pageInfo;
    state.orders.edges = [...state.orders.edges, ...edges];
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
