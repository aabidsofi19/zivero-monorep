import { client } from "../../../main";
import {
  AutoCompleteResults,
  SearchResults,
} from "graphql-client/queries/search";
const state = () => ({
  autocompleteResults: [],
  productSearchResults: {
    page: 1,
    totalResults: 0,
    totalPages: 0,
    results: [],
  },
  isSearchOpen: false,
});

const mutations = {
  setAutocompleteResults(state, results) {
    state.autocompleteResults = results;
  },

  setSearchResults(state, results) {
    state.productSearchResults.page = results.page;
    state.productSearchResults.totalResults = results.totalResults;
    state.productSearchResults.totalPages = results.totalPages;
    state.productSearchResults.results.push(...results.results);
  },
  setSearchOpen(state, value) {
    state.isSearchOpen = value;
  },
};

const actions = {
  async searchAutocomplete({ commit }, query) {
    let res = await client.mutate({
      mutation: AutoCompleteResults,
      variables: { search: query },
    });

    let results = res.data;
    //console.log(results);
    commit("setAutocompleteResults", results.productAutocompleteResults);
  },

  async search({ commit }, { query, pageNo }) {
    if (pageNo == undefined || pageNo == null) {
      pageNo = 1;
    }

    let res = await client.query({
      query: SearchResults,
      variables: { search: query, pageNo: pageNo },
    });
    let results = res.data;
    //console.log(results);
    commit("setSearchResults", results.productSearchResults);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
