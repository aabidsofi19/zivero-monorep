<template>
<div v-if="loading " class="px-8" >
<order-loading class="my-2"  v-for="i in 3 " :key="i"> </order-loading>

</div>
<div v-else>
    <div   class="px-5 ">
        
        <order :order="order.node" v-for="order of orders.edges" :key="order.node.id" class="order pa-3 my-5 "></order>

        <v-btn class=" green" block 
            v-if="orders.pageInfo.hasNextPage" @click="loadOlder()"
            :loading="loadingOld"
            :disabled="loadingOld">
        
            Load Older 
        </v-btn>
    
    </div>
</div>
</template>

<script>
import { mapState,mapActions } from "vuex";
import orderLoading  from "../orders/orderloading.vue";
import order from "../orders/order.vue";
export default{
    components:{
        orderLoading,
        order
    },
    
    data(){
        return{
            loading:true,
            loadingOld:false,
        }
    },
    computed:{
        ...mapState("orders",['orders']),
    },
    methods:{
        ...mapActions("orders",['fetchOrders','fetchMoreOrders']),
        async loadOlder(){
            this.loadingOld =true
            this.loadingOld = await this.fetchMoreOrders({first:5,after:this.orders.pageInfo.endCursor,orderBy:"-createdAt"})
        }
    },
    async mounted(){
        this.loading = await this.fetchOrders({first:5,orderBy:"-createdAt"});
    }
}

</script>

<style scoped>

.order{
    border: 1px solid #ccc;
    border-radius: 5px;
   
    
}

</style>