<template>
  <v-bottom-navigation v-model="value" app color="red ligten-1" grow class="d-block d-lg-none">
    <v-btn value="filter" large @click="toggleFilterDrawer()">
      <span class="text-button"> Filter</span>
    </v-btn>
    <v-btn value="sort" large @click="toggleSortingSheet(true)">
      <span class="text-button">  Sort</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapActions,mapMutations,mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    ...mapActions("app", ["toggleFilterDrawer"]),
    ...mapMutations("filters",["toggleSortingSheet"]),
  },
  comuted :{
     ...mapState("filters",["isSortingSheetOpen"]),

    },
  
};
</script>

<style scoped>
</style>