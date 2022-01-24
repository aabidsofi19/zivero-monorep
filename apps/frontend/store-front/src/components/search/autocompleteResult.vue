<template>
        <v-card class="pa-0 " tile flat >
        
            <v-img
                
                @click='goToProduct()'        
                class="product-image"
                :src='image'
            >  
            </v-img>

            <v-container  class="productDetails  d-flex flex-column pa-1 ma-0 " >
                <div class=' d-flex justify-space-between align-end mb-0 px-1  kpoppins' >
                    <span class='text-overline'>{{brandName}}</span>
                   
                </div>
                <div class='d-flex details flex-column   justify-space-around mt-0'>
                    <span class='ma-0 px-1 grey--black text-md-subtitle-2 text-caption'>{{name}}</span>
                    <span class='ma-0 px-1 d-flex justify-space-between '> 
                        <span id='price'> {{ price}} </span>
                        <span id="mrp"
                            class=' text-caption text-decoration-line-through green--text '>
                            $560
                        </span>
                    </span>
                </div>

            </v-container>
       </v-card>
</template>


<script>
import {mapMutations} from "vuex"
export default{
    props:["name","brandName","price","image","id"],
    methods:{
        ...mapMutations("search",["setSearchOpen"]),
        goToProduct(){
            this.setSearchOpen(false)
            this.$router.push({name:'product',params:{id:this.id}})
        }
    }
    
}
</script>

<style scoped lang="css">

 .product-image{
     height:40vh;
 }

 @media screen and (min-width: 700px){

     .product-image{
         height: 300px;
     }
     
 }
</style>