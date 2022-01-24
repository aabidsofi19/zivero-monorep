<template>
  <nav id="navbar" class="red">
    <v-app-bar class="" app fixed color="#FDF8F5" elevate-on-scroll width="100vw">
      

        <v-app-bar-nav-icon
          class=""
          color="#4F4846"
          @click="toggleNavbar()"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="cursor-pointer" @click="goHome()">
           ZIVERO
        </v-toolbar-title>
     
      
        <v-spacer></v-spacer>
        <div>
        <v-icon @click="setSearchOpen(true)" class="mx-1" color="#4F4846">
            mdi-magnify
        </v-icon>

        

        <v-icon   class="px-1" color="#4F4846" @click="goToWishlist">
          mdi-heart-outline
        </v-icon>
      
       
       
        <v-badge  class="px-1" :content="cart.cartLength" overlap >
          <v-icon class="" id="cart-icon" color="#4F4846" @click="goToCart()">
            mdi-shopping-outline
          </v-icon>
        </v-badge>
      
      </div>
    
    </v-app-bar>

    <navdrawer/>
  </nav>
</template>

<script>

import { mapState,mapMutations } from "vuex";
import navdrawer from "./navdrawer.vue";
export default {
  name: "navbar",

  components: {
     navdrawer
  },
  
  data: () => ({
    group: null,
  }),
  computed: {
    ...mapState("user", ["auth"]),
    ...mapState("cart", ["cart"]),
  },
  methods: {
    ...mapMutations("search",["setSearchOpen"]),
    goHome() {
      this.$router.push({ name: "home" });
    },
    goToCart() {
      this.$router.push({ name: "cart" });
    },
    toggleNavbar() {
      this.$store.dispatch("app/toggleNavbar");
    },
    goToWishlist() {  
      this.$router.push({ name: "wishlist" });
    },
  },
};
</script>

<style scoped lang='css'>
nav {
  margin-bottom: 0%;
  width:100vw;
  overflow:hidden;
  
}
.title {
  /*justify-content: center;*/
  text-align: center;
  margin: auto;
}

#title {
  font-size: 1.5rem;
  color: #266150;
  font-weight: bold;
  cursor: pointer;
}

#cart-icon {
  text-align: left;
  margin-left: auto;
  
}
</style>
