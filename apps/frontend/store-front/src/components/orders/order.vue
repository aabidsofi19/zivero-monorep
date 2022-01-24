<template>
<div v-if="order!=undefined">
    
    <div class="d-flex justify-space-between py-3 " > 
        <p> <span class="font-weight-bold">OrderId: </span>#{{order.id}}</p>

        <v-chip outlined color="green">{{order.paymentStatus}}</v-chip>
    </div>       
    <order-item class="my-2" :orderItem="item" v-for="item of order.orderitemSet" :key="item.product_id">
        
    </order-item>
    <div class="d-flex justify-space-between py-3 " > 
        <p class="font-weight-bold" > Rs {{totalAmount}} </p>

        <p class="text--grey lighten-2 "> {{orderDate}} </p>
    </div> 
    
</div>
</template>

<script>
import orderItem from "./orderItem.vue"
import { mapGetters } from "vuex"
export default{
    props:["order"],
    components:{
        orderItem
    },
    computed:{
        ...mapGetters("orders",['totalOrderAmount']),
        totalAmount(){
            console.log("order",this.order)
            return this.totalOrderAmount(this.order)
        },
        orderDate(){
            return this.order.createdAt.split("T")[0]
        }
    },
    
}

</script>