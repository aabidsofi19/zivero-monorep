import Vue from 'vue'
import Vuex from 'vuex'

import cart from './modules/cart'
import app from './modules/app'
import user from './modules/user'
import products from './modules/products'
import addresses from './modules/address'
import orders from './modules/orders'
import checkout from './modules/checkout'
import filters from './modules/filters'
import search from './modules/search'
import wishlist from './modules/wishlist'
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    app,
    products,
    user,
    cart,
    addresses,
    orders,
    checkout,
    filters,
    search,
    wishlist,
  },
  
})
