<template>
    <div class="d-flex flex-column">
         <span class='text-subtitle-1 font-weight-bold ma-2'>PRICE DETAILS( ({{cart.cartLength}} items)
            </span>
            <v-divider></v-divider>
            <span class='d-flex justify-space-between mb-2 mt-4'>
                <span class="mx-2">Total Mrp</span>
                <span class='mx-2'> Rs {{ totalPriceWitOutDiscount}}</span>
            </span>
            <span class='d-flex justify-space-between my-2 '>
                <span class="mx-2">Discount</span>
                <span class='mx-2 secondary--text'> -Rs {{ discount }}</span>
            </span>
            <span class='d-flex justify-space-between my-2'>
                <span class="mx-2">Shipping and Handling</span>
                <span class='mx-2'> Rs {{ shippingCharges}}</span>
            </span>
            <v-divider></v-divider>
            <span class='d-flex justify-space-between font-weight-bold black--text my-3'>
                <span class="mx-2">Total price</span>
                <span class='mx-2'>Rs {{cart.totalPrice +  shippingCharges}} </span>
            </span>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default{
    // mounted(){
    //     this.$store.dispatch("cart/fetchCart")
    // },
    computed:{
            ...mapState('cart',['cart']),
            ...mapState('checkout',['shippingCharges']),
            totalPriceWitOutDiscount(){
                let totalPrice = 0;
                this.cart.products.forEach(element => {
                    let priceWitOutDiscount = element.price + (element.price * element.variation.discountPercent/100);
                    totalPrice += priceWitOutDiscount*element.quantity;
                });
                return Math.floor(totalPrice);
            },
            discount(){
                return Math.floor(this.totalPriceWitOutDiscount - this.cart.totalPrice);
            },

           
        },
}

</script>
