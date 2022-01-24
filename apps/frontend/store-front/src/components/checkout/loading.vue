<template>

<div  class='container d-flex flex-wrap justify-around' id="cart-loading" >
    <div class="products"> <!--cart products-->
        

        <v-skeleton-loader class="my-3" type="text"></v-skeleton-loader>
        
        
        
        <div id="cart-items"> 
           
            <v-skeleton-loader
                width="100%"
                class='mt-2 mb-2'
                v-for='i in 1'
                :key='i'
                type="card"
            ></v-skeleton-loader>
            
        </div>
    </div>
    <!--Price details --> 
    <div class="price-details">
        <order-loading></order-loading>
    </div>


</div>
</template>

<script>
import orderLoading from "../orders/orderloading.vue";
export default{
    components:{
        orderLoading
    },
}
</script>

<style scoped lang="scss">
#cart-loading{
    .products{
        width:100%;
    }
    .price-details{
        width:100%;
        margin-bottom: 60px;
    }
    
    @media only screen and (min-width:600px){
        .products{
            width:60%;
        }
    }
    @media only screen and (min-width:600px){
        .price-details{
            padding-left:3%;
            width:30%;
        }

    }
}
</style>