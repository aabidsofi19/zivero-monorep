<template>
<v-container class=" mb-4 productsGrid" >
    
    <v-row  v-for='chunk in productChunks' class='pa-0 ma-0'
    :key='chunk'>
      <v-col
        class='ma-0 pa-0'
        v-for="product in chunk"
        :key="product.id"
        cols="6"
        sm='3'
        lg='3'      
      >
        <productCard
          :name="product.name"
          :brandName="product.brand.name"
          :price="product.variations[0].price"
          :image="product.variations[0].images[0]"
          :id="product.id"
        ></productCard>
      </v-col>
    </v-row>

   
  </v-container>

  
</template> 

<script> 
import productCard from "./productCard.vue"
    export default { 
        name: 'productsGrid',
        components: {
           productCard
        },
        props:['productChunks'],
        mounted() {

           
            // this.observer.observe(this.$refs.loader);

        },
        data(){
            return{
               
                products:'',
                hello:'',
                itemsPerRow:2,
                
            }
        },
      
      
        methods:{
            
            goToProduct(id){
                this.$router.push(`/products/${id}`)

            },

        },

       

}   
</script>

<style>
.productsGrid{
    width: 100vw;
    overflow: hidden;
}
 



</style> 
