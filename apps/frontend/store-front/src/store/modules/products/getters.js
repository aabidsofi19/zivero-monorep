import _ from "lodash";
export default {
  productChunks: (state) => {
    return _.chunk(state.products.products, 4);
  },

  productImages: () => (product) => {
    //console.log("product", product);
    let productImages = new Set(product.images);

    for (let variation of product.variations) {
      for (let image of variation.images) {
        productImages.add(image);
      }
    }
    return productImages;
  },

  orginalPrice: () => (price, discountPercent) => {
    return Math.floor(price + (discountPercent / 100) * price);
  },

  variations: (state) => {
    let product = state.product;
    // //console.log(product)
    let filters = {};
    for (let v of product.variations) {
      for (let variant of v.variant) {
        if (variant.name in filters) {
          filters[variant.name].push(variant.value);
        } else {
          filters[variant.name] = [variant.value];
        }
      }
    }
    return filters;
  },
  selectedVariation(state) {
    // let id;
    let clean = (obj) => {
      let y = { name: obj.name, value: obj.value };
      return y;
    };
    for (let variation of state.product.variations) {
      let variant = variation.variant.map(clean);

      if (_.isEqual(variant, state.selected)) {
        //console.log("yes");
        return variation;
      }
    }
    return null;
  },

  variationId(state) {
    // let id;
    let clean = (obj) => {
      let y = { name: obj.name, value: obj.value };
      return y;
    };
    for (let variation of state.product.variations) {
      let variant = variation.variant.map(clean);

      if (_.isEqual(variant, state.selected)) {
        //console.log("yes");
        return variation.Id;
      } else {
        // id= variation.Id
      }
    }
    return null;
  },

  cleanedFilters(state) {
    var filters = {};
    for (var filter in state.filters) {
      if (filter != "variationFilters") {
        filters[filter] = state.filters[filter];
      }
    }
    //delete filters.variationFilters
    delete filters.__typename;

    return filters;
  },
  variationFilters(state) {
    ////console.log(state.filters)
    let cleanedFilters = {};
    let variationFilters = state.filters.variationFilters;
    for (var filter of variationFilters) {
      cleanedFilters[filter.filter] = filter.values;
    }
    //console.log({ cleanedFilters });
    return cleanedFilters;
  },
};
