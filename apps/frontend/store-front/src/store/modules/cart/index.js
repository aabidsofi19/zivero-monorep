import { client } from '../../../main'
import {AddToCart,UPDATE_CART} from '../../../graphql/mutations/cart'
import {getCart} from '../../../graphql/Queries/cart'
const state =()=>({
    cart:{
        cartLength:0,
    },
})

const mutations ={
    addToCart(state,details){
        //console.log('cart',details)
        state.cart=details
    },

    updateCart(state,details){
        //console.log('cart',details)
        state.cart=details
        
    }
}
const actions= {

   async  addToCart({commit},details){
       console.log(details)
       let {data,loading,errors} = await client.mutate({
           mutation:AddToCart,
           variables:{
               productId:details.productId,
               variationId: details.variationId,
               quantity:details.quantity,
           }
       });
       console.log(data,errors)
       let cart = data.AddToCart.cart

       commit('addToCart',cart)
       return {loading,errors}
    },

    async updateCart({commit},details){
        console.log(details)
        commit('app/SET_LOADING',true,{root:true})
        let result = await client.mutate({
            mutation:UPDATE_CART,
            variables:{
                productId:details.productId,
                variationId: details.variationId,
                quantity:details.quantity,
            }
        });
        commit('app/SET_LOADING',result.loading,{root:true})
        console.log(result)
        let cart = result.data.UpdateCart.cart
        commit('updateCart',cart)
    },
    



    async fetchCart({commit}){
       
        console.log("fetching cart")
        let result= await client.query({
            query:getCart,
            fetchPolicy:"no-cache"
        });
        commit('addToCart',result.data.cart)
        return result.loading
    }
}


export default {
    namespaced:true,
    state,
    mutations,
    actions
}
