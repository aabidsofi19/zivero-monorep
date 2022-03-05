<template>
  <v-navigation-drawer
    class="filter-drawer pl-5 pt-4 pr-2"
    id="filter-drawer"
    app
    width="auto"
    v-model="isOpen"
  >
    <v-list nav>
      <div class="d-flex justify-space-between py-2 px-2">
        <p class="h4 pr-3">FILTERS</p>
        <v-btn elevation="0" class="red--text" @click="clearFilters()"
          >CLEAR ALL</v-btn
        >
      </div>
      <v-list-item-group
        class="d-none d-md-flex flex-column pa-0 ma-0"
        v-for="(filterValues, filterType) in cleanedFilters"
        :key="filterType"
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <h3>{{ filterType }}</h3>

        <v-radio-group v-model="selectedValue[filterType]">
          <v-list-item
            @click="fetchProducts((update = true))"
            v-for="(filterValue, index) in filterValues"
            :key="index"
          >
            <v-radio :value="filterValue"></v-radio>
            <v-list-item-title>{{ filterValue }}</v-list-item-title>
          </v-list-item>
        </v-radio-group>
      </v-list-item-group>

      <!-- variationfiilter desktop   -->
      <v-list-item-group
        class="d-none d-md-flex flex-column pa-0 ma-0"
        v-for="(filterValues, filterType) in variationFilters"
        :key="filterType"
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <h3>{{ filterType }}</h3>

        <v-radio-group v-model="selectedVariationValue[filterType]">
          <v-list-item
            @click="fetchProducts((update = false))"
            v-for="(filterValue, index) in filterValues"
            :key="index"
          >
            <v-radio :value="filterValue"></v-radio>
            <v-list-item-title>{{ filterValue }}</v-list-item-title>
          </v-list-item>
        </v-radio-group>
      </v-list-item-group>
    </v-list>

    <!-- mobile mobile-pannel -->
    <v-container fluid class="d-md-none d-flex mobile-pannel pa-0 ma-0"
      ><!-- filter panel for mobile view-->
      <div class="mobile-filters">
        <v-list-item
          v-for="(values, filter) in cleanedFilters"
          :key="filter"
          @click="selectedFilter = filter"
        >
          <v-list-item-title class="text-h6">{{ filter }}</v-list-item-title>
        </v-list-item>

        <!-- filters for colors and other variation stuff -->

        <v-list-item
          @click="selectVariation(variantFilter)"
          v-for="(values, variantFilter) in variationFilters"
          :key="variantFilter"
        >
          <v-list-item-title class="text-h6">{{
            variantFilter
          }}</v-list-item-title>
        </v-list-item>
      </div>

      <v-radio-group
        v-if="selectedFilter != 'variationFilter'"
        v-model="selectedValue[selectedFilter]"
        class="grey lighten-3 my-0 mobile-values"
      >
        <div class="pa-5" v-for="(value, i) of selectedFilterGroup" :key="i">
          <v-radio
            class="text-button pb-2"
            @click="fetchProducts((update = true))"
            :label="value"
            :value="value"
          ></v-radio>
          <div class="divider"></div>
        </div>
      </v-radio-group>

      <!-- variationfilters  -->
      <v-radio-group
        v-if="selectedFilter == 'variationFilter'"
        v-model="selectedVariationValue[selectedVariation]"
        class="grey lighten-3 my-0 mobile-values"
      >
        <div class="pa-5" v-for="(value, i) of selectedFilterGroup" :key="i">
          <v-radio
            class="text-button pb-2"
            @click="fetchProducts((update = false))"
            :label="value"
            :value="value"
          ></v-radio>
          <div class="divider"></div>
        </div>
      </v-radio-group>
      <v-bottom-navigation
        v-model="bottom_selected"
        app
        color="red ligten-1"
        grow
      >
        <v-btn value="filter" large @click="toggleFilterDrawer()">
          <span class="text-button"> Close</span>
        </v-btn>
      </v-bottom-navigation>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  // props: ["isOpen"],
  mounted() {
    this.$store.dispatch("products/getFilters");
    this.selectedValue = this.$store.state.products.queryFilters; //syncs the selected filter values from state to the component helps with syncing queries fromhomepage or other
    // delete this.selectedValue["variantFilter"];    // removes the variantFilter from the selectedValue object as it is not a primary filter
  },
  data() {
    return {
      bottom_selected: "",
      group: "",
      selectedFilter: "gender", // gives the seletec filter type like genders , categories,variationfilter
      selectedVariation: "", // gives the seletef  variation filter type like size,color
      selectedVariationValue: {},
      selectedValue: {}, // returns filter for types expect variationfilters {categories:["red"],genders:["male"]}
    };
  },
  computed: {
    ...mapState("app", ["isFilterDrawerOpen"]),
    ...mapState("products", ["filters"]),
    ...mapGetters("products", ["cleanedFilters", "variationFilters"]),

    cleanedVariationValues() {
      // returns cleaned variation values so that they can be passed into queries {"colrs":["red","blue"]}

      var filters = [];
      for (var filter in this.selectedVariationValue) {
        let variant = { name: "", values: [] };
        variant.name = filter;
        let value = this.selectedVariationValue[filter];
        variant.values.push(value);
        filters.push(variant);
      }
      //console.log("cleanvariationfilter");
      //console.log(filters);
      return filters;
    },

    selectedFilterGroup() {
      // returns all the items in the selectedFilter
      if (this.selectedFilter == "variationFilter") {
        return this.variationFilters[this.selectedVariation];
      } else {
        return this.filters[this.selectedFilter];
      }
      //return "hi";
    },

    isOpen: {
      get: function () {
        return this.isFilterDrawerOpen;
      },

      set: function () {
        //this.toggleFilterDrawer();
        ////console.log("set");
      },
    },
  },
  methods: {
    ...mapActions("app", ["toggleFilterDrawer"]),
    ...mapActions("products", ["updateFilters", "getProducts", "getFilters"]),
    ...mapMutations("products", ["updateQueryFilters"]),
    is_mobile() {
      //console.log(screen.width);
      if (screen.width <= 700) {
        return true;
      } else {
        return false;
      }
    },
    async fetchProducts(updateFilters) {
      this.$emit("filtering", true);

      let loading = await this.getProducts({
        ...this.selectedValue,
        variantFilters: this.cleanedVariationValues,
      });
      this.$emit("filtering", !loading);

      if (updateFilters == true) {
        this.updateFilters(this.selectedValue);
      }
      if (this.is_mobile()) {
        this.toggleFilterDrawer();
      }
    },

    clearFilters() {
      this.selectedValue = {};
      this.selectedVariationValue = {};
      this.getFilters();
      this.getProducts();
      if (this.is_mobile()) {
        this.toggleFilterDrawer();
      }
      //fetch products and updated filters
    },
    selectVariation(filter) {
      this.selectedFilter = "variationFilter";
      this.selectedVariation = filter;
    },
  },

  watch: {
    selectedValue: {
      handler: function (newValue) {
        this.updateQueryFilters({
          ...newValue,
          variantFilters: this.cleanedVariationValues,
        });
      },
      deep: true,
    },

    cleanedVariationValues: {
      handler: function (newValue) {
        this.updateQueryFilters({
          ...this.selectedValue,
          variantFilters: newValue,
        });
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.desktop-pannel {
  padding: 50px;
}

.mobile-pannel {
  width: 100vw;
  height: 100%;
}

.mobile-filters {
  width: 50%;
  /* padding: 10%; */
  /* background-color: rgb(216, 215, 215); */
}

.mobile-values {
  /* padding: 10%; */
  width: 50%;
  /* background-color: rgba(211, 211, 211, 0.856); */
}

.divider {
  background-color: lightgrey;
  height: 1px;
  width: 100%;
}
</style>
