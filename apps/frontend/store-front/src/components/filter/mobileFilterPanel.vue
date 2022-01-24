<template>

<v-navigation-drawer
    class="py-5 px-2"
    app
    stateless
    width="auto"
    v-model="isOpen"
    
  >
    
  
  <header-menu/>
  
  <v-sheet  fluid class="d-md-none d-flex mobile-pannel pa-0 ma-0 " 
        ><!-- filter panel for mobile view-->
      
        <v-list-item-group model="group" class="mobile-filters text-capitalize py-3">
          <v-list-item
            class="grey lighten-4"
            v-for="(_, filter) in cleanedFilters"
            :key="filter"
            @click="selectFilterPanelType(filter)"
            active-class="white font-weight-bold"
          >
            <v-list-item-content  active-class="white black--text font-weight-bold" >
            
              <v-list-item-title>{{ filter }}</v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
          
          <!-- filters for colors and other variation stuff -->

          <v-list-item
            class="grey lighten-4"
            active-class="white font-weight-bold"
            v-for="(_, variantFilter) in variationFilters"
            :key="variantFilter"
            @click="selectVariantFilterPanelType(variantFilter)"
          >
            <v-list-item-content class="">
              
              <v-list-item-title >{{ variantFilter }}</v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        
        <filter-item-group    
              class="text-wrap"     
              :filterType="filterType"  
              :multiple="filterType=='gender'? false:true"
              :filterValues="selectedFilterGroup"   
              v-if="!mobilePanel.isVariantFilterSelected" >
        </filter-item-group>
        <variant-filter-item-group 
            :filterType="filterType"  
            :multiple="true" 
            :filterValues="selectedFilterGroup"   
            v-else />
      
        <v-bottom-navigation
          
          app
          color="red ligten-1"
          grow
        >
          <v-btn value="filter" large @click="toggleFilterDrawer()">
            <span class="text-button"> Close</span>
          </v-btn>
        </v-bottom-navigation>
   </v-sheet>

</v-navigation-drawer>
</template>


<script>
import { mapState,mapMutations,mapGetters,mapActions } from "vuex"
import filterItemGroup from "./filterItemGroup.vue";
import variantFilterItemGroup from "./variantFilterGroup.vue";
import headerMenu from "./header.vue";
export default {

   components:{
            filterItemGroup,
            variantFilterItemGroup,
            headerMenu
   },
   data:()=>({
       bottom_selected:"",
       group:"",//used as dummy model to listitem group
   }),
   computed:{
        ...mapGetters("products", ["cleanedFilters", "variationFilters"]),
        ...mapState("filters",["filterInput","variantFilterInput","mobilePanel"]),
        ...mapState("app", ["isFilterDrawerOpen"]),

        selectedFilterGroup() {
            
            if (this.mobilePanel.isVariantFilterSelected) {
                return this.variationFilters[this.mobilePanel.selectedVariantType];
            } else {
                return this.cleanedFilters[this.mobilePanel.selectedFilterType];
            }
            
        },
        filterType(){
            if (this.mobilePanel.isVariantFilterSelected){
                return this.mobilePanel.selectedVariantType;
            }else{

                let selected =this.mobilePanel.selectedFilterType
                if(selected=="genders"){
                    return "gender"
                }
                return selected
            }
        },
        isOpen(){
          
            return this.isFilterDrawerOpen; 
        },
   },
   methods:{
       ...mapMutations("filters",["setMobilePanelState"]),
        ...mapActions("app", ["toggleFilterDrawer"]),
       selectFilterPanelType(filter){
          
           this.setMobilePanelState({
               key:"selectedFilterType",
               value:filter
           })
           this.setMobilePanelState({
               key:"isVariantFilterSelected",
               value:false
           })
       },
       selectVariantFilterPanelType(filter){
           this.setMobilePanelState({
               key:"selectedVariantType",
               value:filter
           })
           this.setMobilePanelState({
               key:"isVariantFilterSelected",
               value:true
           })
       },

   }
  
}
</script>

<style scoped>


.bordered{
    border: 2px solid black;
}
.mobile-pannel {
  width: 100vw;
  height: 100%;
  overflow-wrap: break-word;
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