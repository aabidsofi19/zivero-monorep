import { client } from "../../../main";

import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
} from "graphql-client/queries/productQueries";
import { fetchFilters } from "graphql-client/queries/filter";
import { UPDATE_FILTERS } from "graphql-client/mutations/filter";
import { fetchCategories } from "graphql-client/queries/filter";

export default {
  async getProducts({ commit }, { filters, pageNb }) {
    let result;
    console.log("fetching products");
    if (pageNb === undefined) {
      pageNb = 1;
    }
    console.log({ filters }, pageNb);

    result = await client.query({
      query: GET_PRODUCTS_QUERY,
      variables: {
        filter: { ...filters },
        page: pageNb,
      },
    });

    if (result) {
      commit("addProducts", result.data.Products);
    }
    return result.loading;
  },

  async getMoreProducts({ state, commit }) {
    let result;
    console.log("adding more ", state.queryFilters);
    console.log("fetching more products");
    result = await client.query({
      query: GET_PRODUCTS_QUERY,
      variables: {
        filter: { ...state.queryFilters },
        page: state.products.pageNo + 1,
      },
    });
    console.log("fetched", result);
    if (result) {
      commit("addMoreProducts", result.data.Products);
    }
  },

  async getProduct({ commit }, id) {
    let result = await client.query({
      query: GET_PRODUCT_QUERY,
      variables: {
        id: id,
      },
    });

    if (result.data) {
      commit("getProduct", result.data.product);
    }

    return result;
  },
  async getFilters({ commit }) {
    let result = await client.query({
      query: fetchFilters,
      fetchPolicy: "no-cache",
    });

    console.log(result.data);
    if (result.data) {
      commit("addFilters", result.data.filters);
    }
  },

  async getCategories({ commit }) {
    let result = await client.query({
      query: fetchCategories,
      fetchPolicy: "no-cache",
    });

    console.log("getcategories", result.data);
    if (result.data) {
      commit("addCategories", result.data.categories);
    }
  },

  async updateFilters({ commit }, data) {
    console.log("updating Filters", data);
    //need data to pass for variables in form data should contain gender , category or brand property
    let result = await client.mutate({
      mutation: UPDATE_FILTERS,
      variables: { ...data },
    });
    console.log("updatedFilters");
    commit("updateFilters", result.data.updateFilters.updatedFilters);
    console.log(result.data);
    //console.log(result.data.updatedFilters)
  },
  async addTempFilter({ commit }, data) {
    commit("addTempFilters", data);
  },
};
