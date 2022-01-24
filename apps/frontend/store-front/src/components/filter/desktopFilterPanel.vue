<template>
<v-container  class="filter-panel pt-5 mx-3  d-none d-md-flex flex-column  ">
    <header-menu/>
    <v-list nav class="d-none d-md-flex flex-column ">
      
        
        <filter-item-group :multiple="false" label="genders" filterType="gender" :filterValues='cleanedFilters["genders"]'  ></filter-item-group>
        <filter-item-group :multiple="true" label="categories" filterType="categories" :filterValues='cleanedFilters["categories"]'  ></filter-item-group>
        <filter-item-group :multiple="true" label="brands" filterType="brands" :filterValues='cleanedFilters["brands"]'  ></filter-item-group>
            
        <variant-filter-item-group
           v-for="(values,filterType) in variationFilters "
           :key="filterType"
           :multiple="true" :label="filterType" :filterType="filterType" :filterValues="values"
        >

        </variant-filter-item-group>

    </v-list>
</v-container>  
</template>


<script >
import { mapState, mapActions, mapGetters,} from "vuex";
import filterItemGroup from "./filterItemGroup.vue"
import variantFilterItemGroup from "./variantFilterGroup.vue"
import headerMenu from "./header.vue"
export default {
  
  components:{
     filterItemGroup,
     variantFilterItemGroup,
     headerMenu
    
  },
 
  data() {
    return {

    };
  },
  computed: {
    ...mapState("app", ["isFilterDrawerOpen"]),
    ...mapState("products", ["filters"]),
    ...mapGetters("products", ["cleanedFilters", "variationFilters"]),

    
    
  },
  methods: {
  
    ...mapActions("filters",["clearFilters"]),
   
    
  },

  
};
</script>


<style scoped lang="scss">

.filter-panel {
    width: 300px;
    position: sticky;
    // height: 80vh;
    // overflow-y: scroll;
    -ms-overflow-style: none !important;  /* Internet Explorer 10+ */
    scrollbar-width: none !important;  /* Firefox */
}
.filter-panel::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}

.filter-panel {
    -ms-overflow-style: none !important;  /* Internet Explorer 10+ */
    scrollbar-width: none !important;  /* Firefox */
}
.v-navigation-drawer::-webkit-scrollbar { 
    display: none !important;  /* Safari and Chrome */
}
</style>