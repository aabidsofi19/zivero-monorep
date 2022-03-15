export default {
  addProducts(state, data) {
    state.products = data;
  },

  addMoreProducts(state, data) {
    state.products.products.push(...data.products);
    state.products.pageNo = data.pageNo;
  },

  getProduct(state, product) {
    state.product = product;
  },
  clearProduct(state) {
    state.product = {};
  },
  //selects a variant from product page
  selectVariant(state, variant) {
    //
    let found = false;
    for (let v of state.selected) {
      if (v.name == variant.name) {
        v.value = variant.value;
        found = true;
        break;
      }
    }
    if (!found) {
      state.selected.push(variant);
    }
  },
  clearSelectedVariants(state) {
    state.selected = [];
  },
  addFilters(state, data) {
    state.filters = data;
  },

  updateFilters(state, data) {
    for (var filter in data) {
      if (data[filter] !== null) {
        state.filters[filter] = data[filter];
      }
    }
  },
  addCategories(state, data) {
    if (state.categories.length == 0) {
      state.categories.push(...data);
    }
  },
  addTempFilters(state, data) {
    state.tempFilters = data;
  },

  // mutations related to filter queries

  //updates the query filters
  updateQueryFilters(state, data) {
    state.queryFilters = data;
  },

  clearProductsPage(state) {
    state.products = {};
  },
};
