<template>
  <loading v-if="loading"> </loading>

  <div v-else>
    <cart-empty v-if="cart.cartLength <= 0"></cart-empty>

    <div v-else class="container d-flex flex-wrap justify-around" id="cart">
      <div class="products">
        <!--cart products-->

        <checkoutProgress cart="true" />
        <offer class="pa-2"></offer>

        <div
          class="pt-6 pb-2 text-subtitle-1 font-weight-bold darkGrey--text px-2 d-flex justify-space-between"
        >
          <span>My Shopping Bag({{ cart.cartLength }} Item)</span>
          <span>Total: Rs {{ cart.totalPrice }}</span>
        </div>
        <div id="cart-items">
          <cartProduct
            class="mt-2 mb-2"
            v-for="cartObj in cart.products"
            :key="uniqueKey(cartObj)"
            :cartObject="cartObj"
          ></cartProduct>
        </div>
      </div>
      <!--Price details -->
      <div class="price-details">
        <v-card
          elevation="0"
          outlined
          rounded
          class="mt-2 pa-2 pb-8 d-flex flex-column"
        >
          <paymentDetails></paymentDetails>

          <v-btn
            @click="goToAddress()"
            color="primary"
            tile
            elevation="1"
            class="white--text place-order-btn"
          >
            PLACE ORDER
          </v-btn>
          <cartBottomnavigation
            class="bottom-navigation"
            @submit="goToAddress()"
            btnLabel="Place Order"
          >
          </cartBottomnavigation>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import cartProduct from "../components/cart/cart-product-preview.vue";
import offer from "../components/offer.vue";
import cartBottomnavigation from "../components/checkout/checkoutBottomNavigation.vue";
import checkoutProgress from "../components/checkout/checkoutProgress.vue";
import cartEmpty from "../components/cart/cartEmpty.vue";
import loading from "../components/cart/loading.vue";
import paymentDetails from "../components/checkout/paymentDetails.vue";
import { mapState } from "vuex";
export default {
  name: "cart",
  components: {
    cartProduct,
    cartBottomnavigation,
    offer,
    checkoutProgress,
    cartEmpty,
    loading,
    paymentDetails,
  },
  async mounted() {
    this.loading = await this.$store.dispatch("cart/fetchCart");
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState("cart", ["cart"]),
  },

  methods: {
    goToAddress() {
      this.$router.push({ name: "selectAddress" });
    },
    uniqueKey(cartObj) {
      let key = `${cartObj.product.id},${cartObj.variation.Id}`;
      return key;
    },
  },
};
</script>

<style scoped lang="scss">
#cart {
  .products {
    width: 100%;
  }
  .price-details {
    width: 100%;
    margin-bottom: 60px;
  }
  .place-order-btn {
    display: none;
  }
  @media only screen and (min-width: 600px) {
    .products {
      width: 65%;
    }
  }
  @media only screen and (min-width: 600px) {
    .price-details {
      padding-left: 3%;
      width: 30%;
    }

    .bottom-navigation {
      display: none;
    }

    .place-order-btn {
      display: block;
    }
  }
}
</style>
