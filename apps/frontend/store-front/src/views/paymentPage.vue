<template>
<loading v-if="checkoutLoading" />
<div v-else>

    <checkoutProgress class="mt-6" payment="true"/>

    <div  class='container d-flex flex-row flex-wrap justify-center' id="checkout">
        <div class="paymentOptions" > <!--pAYMENT OPTIONS-->

        
            <offer class="pa-2"></offer>
            
            <div class="my-4">
                <p class="text-h5 font-weight-bold black--text ">Payment</p>
                <p class="text-subtitle-1 grey--text">All transactions are secure and encrypted</p>
            </div>
            <paymentErrors :errors="stripePaymentErrors" />
            <form id="payment-form">
                <div id="payment-element" ref="paymentElement">
                    <v-skeleton-loader type="card"></v-skeleton-loader>
                    <!-- Elements will create form elements here -->
                </div>
                <div id="error-message">
                    <!-- Display error message to your customers here -->
                </div>
            </form>
            
        </div>
        <!--Price details --> 
        <div class="price-details">
            <v-card
                elevation="0"
                outlined
                rounded
                class='mt-2 pa-2  pb-8 d-flex flex-column'>
                <order-loading v-if="orderLoading"></order-loading>
                <order :order="activeOrder" v-else ></order>
                <p  v-if="!orderLoading"> Incl Shipping Charges:   Rs {{activeOrder.extraCharges }}</p>
                <v-btn @click='submitPayment()' color="#266150" :loading="btnLoading" :disabled="btnLoading" tile elevation="1" class="white--text place-order-btn">
                    PLACE ORDER
                </v-btn>
                <checkoutBottomNavigation :loading="btnLoading" :disabled="btnLoading"  @submit="submitPayment()" btnLabel="Place Order"  class="bottom-navigation"> </checkoutBottomNavigation> 
            </v-card>
            
        </div>

    </div>

</div>
</template>

<script>

import offer from '../components/offer.vue'
import checkoutProgress from '../components/checkout/checkoutProgress.vue';
import loading from '../components/checkout/loading.vue';
import orderLoading from '../components/orders/orderloading.vue';
// import paymentDetails from '../components/checkout/paymentDetails.vue';
import checkoutBottomNavigation from "../components/checkout/checkoutBottomNavigation.vue"
import paymentErrors from '../components/checkout/paymentErrors.vue';
import order from '../components/orders/order.vue';
import {mapState,mapActions} from 'vuex'
    export default { 
        name: 'cart',
        components: {  
            offer,
            checkoutProgress,        
            loading,
            // paymentDetails,
            checkoutBottomNavigation,
            paymentErrors,
            order,
            orderLoading,

        },
        async mounted(){
          
            
            let secret = await this.fetchCheckoutSecret()
            if (secret){
                this.checkoutLoading=false
                this.includeStripe('js.stripe.com/v3/', function(){
                    this.initStripe();
                }.bind(this) );        
                               
            }

            this.orderLoading = await this.fetchActiveOrder()
        },
        data(){
            return {
               stripeLoading:true,
               checkoutLoading:true,
               orderLoading:true,
               stripe:null,
               elements:null,
               stripePaymentErrors:null,
               btnLoading:false,
              
               
            }
        },
        computed:{
            ...mapState('cart',['cart']),
            ...mapState("checkout",["checkoutSecret"]),
            ...mapState("orders",["activeOrder"]),

            
        },

        methods:{
            ...mapActions("checkout",["fetchCheckoutSecret"]),
            ...mapActions("orders",["fetchActiveOrder"]),
            submit(){
                console.log("paying")
            },
            includeStripe( URL, callback ){
                let documentTag = document, tag = 'script',
                    object = documentTag.createElement(tag),
                    scriptTag = documentTag.getElementsByTagName(tag)[0];
                object.src = '//' + URL;
                if (callback) { object.addEventListener('load', function (e) { callback(null, e); }, false); }
                scriptTag.parentNode.insertBefore(object, scriptTag);
            },

            initStripe(){
               this.stripe = window.Stripe("pk_test_Jv6wYlXEfjDe5XS5C2MpqEuR00xUQo6Buk")
               this.mountElements()
            },
            mountElements(){
                const options = {
                    clientSecret: this.checkoutSecret,
                    // // Fully customizable with appearance API.
                    // appearance: {/*...*/},
                };
                this.elements = this.stripe.elements(options);
                const paymentElement = this.elements.create('payment');
                paymentElement.mount("#payment-element");

            },
            async submitPayment(){
                let elements= this.elements
                this.btnLoading=true
                const {error} = await this.stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: 'http://localhost:8080/checkout/payment-status',
                    },
                });

                if(error){
                    this.btnLoading=false
                    this.stripePaymentErrors = error
                }
            }
            
        }
    }    
</script>

<style scoped lang="scss">

#checkout{
    .paymentOptions{
        width:100%;
    }
    .price-details{
        width:100%;
        margin-bottom: 60px;
    }
    .place-order-btn{
        display: none
    }
    @media only screen and (min-width:600px){
        .paymentOptions{
            width:50%;
        }
    }
    @media only screen and (min-width:600px){
        .price-details{
            padding-left:3%;
            width:40%;
        }

        .bottom-navigation{
           display: none;
        }

         .place-order-btn{
            display: block
        }
    }
}
</style>