import Vue from 'vue';
import Router from 'vue-router';

import homePage from '@/components/homePage.vue';

import cart from '../views/cart.vue';

import login from '../views/login.vue';
import signup from '../views/signup.vue';
import verifyEmailSent from '../views/verifyEmailSent.vue';
import confirmEmail from "../views/confirmEmail.vue"
import forgotPassword from "../views/forgotPassword.vue"
import resetPassword  from "../views/passwordReset.vue"


import User from '../views/profile.vue'
import orders from '@/components/profile/orders.vue'
import addresses from '@/components/profile/addresses.vue'
import account from '@/components/profile/account.vue'

import productsPage from'../views/productsPage.vue';
import productPage from '../views/product.vue'

import paymentPage from '../views/paymentPage.vue';
import selectAdress from '../views/selectAddress.vue';
import addAddress from "../views/addAddress.vue"
import paymentStatus from "../views/paymentStatusPage.vue";

import searchResults from '../views/searchResults.vue';

import wishlist from '../views/wishlist.vue';
//import store from '../store'

Vue.use(Router);

const routes = [
  {
    path: '*',
    name: 'home',
    title: 'home',
    component: homePage,
  },
  {
    path:'/products/:id',
    name:'product',
    component:productPage
  },
  {
    path:'/cart',
    name:'cart',
    component:cart,
   
  },
 
  {
    path:'/login',
    name:'login',
    component:login

  },
  {
    path:'/signup',
    name:'signup',
    component:signup
  },
  {
    path:'/verification-link-sent',
    name:'verification-link-sent',
    component:verifyEmailSent
  },
  {
    path:'/activate/:token',
    name:'activate-account',
    component:confirmEmail
  },
  {
    path:"/forgot-password",
    name:"forgot-password",
    component:forgotPassword
  },
  {
    path:"/password-reset/:token",
    name:"password-reset",
    component:resetPassword

  },
  {
    path:'/profile',
    name:'profile',
    component:User,
    meta:{requiresAuth:true},
    children:[
      {
        path:'/profile/orders',
        name:'orders',
        component:orders
      },
      {
        path:'/profile/addresses',
        name:'addresses',
        component:addresses
      },
      {
        path:'/profile/account',
        name:'account',
        component:account
      }

    ]
  },
  {
    path:'/products',
    name:'products',
    component:productsPage
  },
  {
    path:"/search-results/:query",
    name:"search-results",
    component:searchResults
  },

  {
    path:'/wishlist',
    name:'wishlist',
    component:wishlist
  },
  {
    path:'/checkout/select-address',
    name:'selectAddress',
    component:selectAdress,
    meta:{requiresAuth:true}
  },
  {
    path:'/address/add-address',
    name:'addAddress',
    component:addAddress,
    meta:{requiresAuth:true}
  },
  {
    path:'/checkout/payment',
    name:'payment',
    component:paymentPage,
    meta: { requiresAuth: true }
  },
  {
    path:'/checkout/payment-status',
    name:'paymentStatus',
    component:paymentStatus,
    meta: { requiresAuth: true }
  }

  

  
];
const router= new Router({
    mode:'history',
    routes,
});

router.beforeEach((to, from, next) => {
    // Check if the user is logged i
   // console.log(JSON.stringify(store.getters))
  const isUserLoggedIn = localStorage.getItem('Zivero_refresh_token')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
     // store.dispatch('logOut')
     let redirect
     if(from.name=="cart"){
       redirect=from.fullPath
     }else{
       redirect=to.fullPath
     }
     next({
        path: '/login',
        query: { redirect: redirect }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
