<template>
  <div>
    <mobile-filter-panel> </mobile-filter-panel>
    <desktop-filter-panel> </desktop-filter-panel>
  </div>
</template>

<script>
// import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

import mobileFilterPanel from "./mobileFilterPanel.vue";
import desktopFilterPanel from "./desktopFilterPanel.vue";
export default {
  components: {
    desktopFilterPanel,
    mobileFilterPanel,
  },
  mounted() {
    this.$store.dispatch("products/getFilters");
  },
  data() {
    return {};
  },
  // computed: {
  //   ...mapState("app", ["isFilterDrawerOpen"]),
  //   ...mapState("products", ["filters"]),
  //   ...mapGetters("products", ["cleanedFilters", "variationFilters"]),

  //   is_mobile() {
  //     //console.log(screen.width);
  //     if (screen.width <= 700) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },

  //   isOpen: {
  //     get: function () {

  //       if(!this.is_mobile){
  //         return true
  //       }

  //       return this.isFilterDrawerOpen;
  //     },

  //     set: function () {
  //       //this.toggleFilterDrawer();
  //       ////console.log("set");
  //     },
  //   },
  // },
  // methods: {
  //   ...mapActions("app", ["toggleFilterDrawer"]),
  //   ...mapActions("filters",["clearFilters"]),
  //   ...mapMutations("products", ["updateQueryFilters"]),

  // },
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
