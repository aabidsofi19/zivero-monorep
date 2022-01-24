<template>
<div>
  <loader v-if="loading"></loader>
  <v-container v-else class="d-flex flex-wrap justify-center" >
      <product-card v-for="product in productSearchResults.results" :key="product.Id"
        class="product-card"
        :name="product.name" 
        :id ="product.Id"
        :image="product.variations[0].images[0]"
        :price="product.variations[0].price"      
      />

  </v-container>
  <v-btn block color="red" class="mb-4 white--text" @click="searchMoreProducts"
          v-show="hasNextPage"
         :loading="searchingMoreProducts" :disabled="searchingMoreProducts">
          Search More
  </v-btn>
</div>
</template>

<script>
import {mapState,mapActions} from "vuex"
import productCard from "../components/products/productCard.vue"
import loader from "../components/products/loader.vue"
export default {
   components: {productCard,loader},
   computed:{
       ...mapState("search",["productSearchResults"]),
       hasNextPage() {
          return this.productSearchResults.page < this.productSearchResults.totalPages
       },
   },
   async mounted(){
     this.query = this.$route.params.query
     
     await this.search({query:this.query})
     this.loading= false
   },
   data(){
       return {
          loading:true,
          searchingMoreProducts:false,
          query:"",
       }
   },
   methods:{
     ...mapActions("search",["search"]),
      async searchMoreProducts(){
        this.searchingMoreProducts =true
        let payload={
          pageNo:this.productSearchResults.page+1,
          query:this.query
        }
        await this.search(payload);
        this.searchingMoreProducts =false
      }
   }
}
</script>

<style scoped >
.product-card{
  width:49%;
  
  
}

@media screen and (min-width: 700px){
  .product-card{
    width:25%;
  }
}
  
</style>