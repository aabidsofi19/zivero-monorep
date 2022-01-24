<template>
<div>
  <mobile-filter-panel   />
  <productsLoading v-if="productsLoading" />
  
  <div v-else class="d-flex">
    
    <desktop-filter-panel v-if="!isMobile" />
    
    <productsLoading v-if="isFiltering" />

    <div v-else >

        <v-sheet class="justify-end d-none d-md-flex" width="100%">
          <sortingMenu class="mx-5 my-2 d-none d-md-block "/>
        </v-sheet>
        
        <productsGrid  @scroll.prevent :productChunks="productChunks"> </productsGrid>
         
        <div class="px-4">
        <v-btn block color="primary" tile  class="mb-4 mt-4 white--text" @click="fetchMoreProducts"
          v-show="hasNextPage"
         :loading="fetchingMoreProducts" :disabled="fetchingMoreProducts">
          Load More
        </v-btn>
        </div>
        
    </div>
   
    <sortingBottomSheet/>
    <bottom-navigation ></bottom-navigation>
  </div>
</div>

</template>

<script>
import productsGrid from "../components/products/productsGrid.vue";
import desktopFilterPanel from "../components/filter/desktopFilterPanel.vue";
import mobileFilterPanel from "../components/filter/mobileFilterPanel.vue"
import bottomNavigation from "../components/products/productsBtmnav.vue";
import productsLoading   from "../components/products/loader.vue";
import sortingMenu from "../components/filter/sortingMenu.vue";
import sortingBottomSheet from "../components/filter/sortingBottomSheet.vue";
// import loader from "../components/products/loader.vue";
// import Loading from "../components/loading.vue"

import {mapState,mapActions , mapGetters, mapMutations} from "vuex"
// import Loading from "../components/loading.vue";
export default {
  name: "productsPage ",
  components: {
    productsGrid,
    mobileFilterPanel,
   desktopFilterPanel,
    bottomNavigation,
    productsLoading,
    sortingMenu,
    sortingBottomSheet,
    
},
  async mounted() {
     
    this.$store.dispatch("products/getFilters");

    //  if (! this.areFiltersChanged){
       
    //     
    //     await this.getProducts({})
    //     this.productsLoading =false

    //  }
    this.productsLoading = true
    let query=this.$route.query.filter
    let filter={}
    console.log(query)
    if( query != undefined ){
        filter = JSON.parse(query)
    }
    
    console.log(filter)
    this.setFilters(filter)
    await this.filterProducts(true)
    this.productsLoading =false

    

  },
  destroyed(){
    console.log("destroyed")
    this.resetFilters()
    this.clearProductsPage()
  },
  data() {
    return {
      productsLoading:false,
      oberver : null,
      isOpenDrawer: false,
      fetchingMoreProducts:false
    };
  },

  computed: {
    ...mapState("products",["products"]) ,
    ...mapState("filters",["isFiltering"]),
    ...mapGetters("filters", ["areFiltersChanged"]),
    page(){
      return this.products.pageNo
    },
    productChunks() {
      let p = this.$store.getters["products/productChunks"];
      return p;
    },
    is_mobile() {
      console.log(screen.width);
      if (screen.width <= 700) {
        return true;
      } else {
        return false;
      }
    },

    hasNextPage() {
       return this.products.pageNo < this.products.totalPages
    }
  },

  

  methods: {
    ...mapActions("products",["getMoreProducts","getProducts"]),
    ...mapActions("filters",["filterProducts"]),
    ...mapMutations("products",["clearProductsPage"]),
    ...mapMutations("filters",["resetFilters","setFilters"]),
    handleObserver(entries, observer){
      if(entries[0].isIntersecting){
          console.log('loading more products',observer)
          this.loading = true
          observer.unobserve(this.$refs.loader);
          this.getMoreProducts()
          }
    },

    async fetchMoreProducts(){
      this.fetchingMoreProducts =true
      await this.getMoreProducts();
      this.fetchingMoreProducts =false
    }




  },

  watch:{
   
    // products :{
    //   handler: function(val, ){
    //     console.log("products changed",)
    //     console.log(val.pageNo)
    //     if(val.pageNo == val.totalPages){
    //       this.loading = false
    //       console.log("final pages")
    //       return
    //     }
    //     this.loading = false
    //     console.log("observing",)
    //     this.observer.observe(this.$refs.loader)
    //   },
    //   deep: true
    // }
  }

};
</script>

<style scoped >
/* @media  screen and (min-width: 700px) {
   
   .products{
     margin-left: auto;
     margin-right:50px;
   }
  
} */
</style>
