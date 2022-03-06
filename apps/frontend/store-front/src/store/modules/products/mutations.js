export default {
  addProducts(state, data) {
    ////console.log('addProducts',JSON.stringify(data))
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
    // //console.log(state.selected)
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
    //console.log("filter_data")
    //console.log(data)
    state.filters = data;
  },

  updateFilters(state, data) {
    //console.log({data})
    for (var filter in data) {
      if (data[filter] !== null) {
        //console.log(filter)
        state.filters[filter] = data[filter];
      }
    }
    //console.log(state.filters)
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
    //console.log("updateQueryFilters")
    //console.log(data)
    state.queryFilters = data;
  },

  clearProductsPage(state) {
    state.products = {};
  },
};
