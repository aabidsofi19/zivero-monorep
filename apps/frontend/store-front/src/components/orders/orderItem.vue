<template>
<v-container class="d-flex justify-start grey lighten-3 pt-6" v-if="orderItem.product" color="lightgrey">


<v-badge overlap :content="orderItem.Quantity">
    <!-- <v-badge  width="20%" max-width="100px" :content="orderItem.Quantity" height="auto" overlap > -->
    <v-img :src="orderItem.variation.images[0]"   width="80px"  contain class="rounded ma-0 pa-0">
    </v-img>
    <!-- </v-badge> -->
</v-badge>

<div class="ml-5">
     <p class="text-subtitle-1 font-weight-bold text-uppercase my-0">{{orderItem.product.brand.name}}</p>
     <p class="text-subtitle-2 text-capitalize my-1">{{orderItem.product.name}}</p>
     <div class="text-subtitle-2 text-capitalize my-1 " >
         <span  class="mr-2" v-for="variant of orderItem.variation.variant" :key="variant.name">
            {{variant.name}}: <span class="text-uppercase">{{variant.value}}</span> 
         </span>
     </div>
     <p>
         total : {{orderItem.Amount * orderItem.Quantity }} 
     </p>
</div>
               
</v-container>
</template>


<script>
export default{
    props:["orderItem"],
}
</script>