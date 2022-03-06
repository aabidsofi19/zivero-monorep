<template>
  <v-overlay width="100%" height="100%" v-if="loadingProduct">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
  <v-flex v-else class="d-flex flex-column">
    <v-alert
      :value="true"
      v-for="error in errors"
      :key="error"
      dismissible
      type="error"
    >
      {{ error }}
    </v-alert>

    <div class="d-flex flex-row flex-wrap justify-space-around product white">
      <product-carousal id="product-carousel" :images="productImages(product)">
      </product-carousal>

      <div id="product-details">
        <v-card class="poppins pa-4" width="auto" elevation="0" tile>
          <span class="text-subtitle-1 font-weight-bold text-uppercase">
            {{ product.brand.name }}
          </span>
          <div class="text-h3 font-weight-bold text-capitalize py-4">
            {{ product.name }}
          </div>
          <span class="d-flex py-3 justify-start price">
            <span class="poppins">
              {{ product.variations[0].price }}
            </span>
            <span class="text-decoration-line-through grey--text kpoppins"
              >500</span
            >
            <span class="poppins red--text">
              (You save {{ product.variations[0].discountPercent }}%)
            </span>
          </span>
          <span class="green--text font-weight-bold text-caption poppins price">
            Inclusive of all taxes
          </span>
        </v-card>

        <!-- <p>
          selected {{selected}} <br>
          variantion {{variationId}}
        </p>  -->

        <div
          class="pa-2 mb-2"
          v-for="(variation, name) in JSON.parse(product.availableVariants)"
          :key="variation"
        >
          <span class="text-caption font-weight-medium mb-3 text-uppercase">
            {{ name }}
          </span>
          <!-- variants selection for color -->
          <span class="d-flex flex-wrap justify-start" v-if="name == 'color'">
            <span
              class="ma-1 mx-3 rounded-circle"
              :class="{ black: buttonSelected(name, value) }"
              v-for="(value, i) in variation"
              :key="i"
            >
              <!-- outline for color selection -->
              <v-btn
                fab
                elevation="0"
                @click="select(name, value)"
                :ref="value"
                :color="value"
                class="rounded-circle ma-1 pa-1 color-selector"
              >
              </v-btn>
            </span>
          </span>
          <!-- variations selection for size ,etc -->
          <span v-else class="d-flex flex-wrap justify-start">
            <v-btn
              tile
              elevation="0"
              :outlined="buttonSelected(name, value)"
              @click="select(name, value)"
              :ref="value"
              color=""
              v-for="(value, i) in variation"
              :key="i"
              class="ma-2 pa-0"
            >
              {{ value }}
            </v-btn>
          </span>
        </div>

        <!-- <checkDelivery class="mt-2 mb-2"> </checkDelivery> -->

        <div class="d-none d-md-flex flex-column px-3 my-3">
          <v-btn
            dark
            tile
            color="secondary"
            block
            class="py-8"
            :loading="addingToCart"
            :disabled="isDisabled"
            @click="add2Cart()"
            elevation="0"
          >
            <span class="px-3"><v-icon>mdi-cart</v-icon> </span>
            <span>ADD TO BAG </span>
          </v-btn>
          <v-btn
            color="accent"
            @click="addToWishlist"
            width="45%"
            class="py-8 my-3"
            outlined
            block
          >
            <span class="px-3"><v-icon>mdi-heart</v-icon> </span>
            <span class="text-caption text-md-button">ADD TO WISHLIST</span>
          </v-btn>
        </div>

        <div tile class="mb-2 pa-3">
          <h2 class="text-subtitle-1 font-weight-bold text-uppercase pb-3">
            details
          </h2>
          <container class="poppins wrap" v-html="sanitizedDescription">
          </container>
        </div>
      </div>
      <!-- end of product details div -->
    </div>
    <!-- end of product carousel and details flex -->

    <v-bottom-navigation
      class="pa-2 d-flex d-md-none justify-center"
      round
      horizontal
      fixed
    >
      <v-btn
        color="accent"
        width="auto"
        height="95%"
        outlined
        @click="addToWishlist"
        class="mx-7 px-6 py-2"
      >
        <span><v-icon>mdi-heart</v-icon> </span>
        <span class="text-caption text-md-button">ADD TO WISHLIST</span>
      </v-btn>
      <v-btn
        :loading="addingToCart"
        :disabled="isDisabled"
        color="secondary"
        width="56%"
        @click="add2Cart()"
        height="95%"
        elevation="3"
        class="mx-1"
        id="tocart"
      >
        <span><v-icon>mdi-cart</v-icon> </span>
        <span>ADD TO BAG </span>
      </v-btn>
    </v-bottom-navigation>
  </v-flex>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { mapState, mapGetters } from "vuex";
//import _ from 'lodash'
import checkDelivery from "../components/check-delivery.vue";
import productCarousal from "../components/products/productCarousal.vue";
export default {
  name: "productPage",
  components: {
    productCarousal,
    checkDelivery,
  },

  async mounted() {
    let id = this.$route.params.id;
    let { errors, loading } = await this.$store.dispatch(
      "products/getProduct",
      id
    );
    this.errors = errors;
    this.loadingProduct = loading;
  },
  data() {
    return {
      errors: ["select product variant "],
      loadingProduct: true,
      addingToCart: false,
      wishlisted: false,
    };
  },
  computed: {
    ...mapState("products", ["product", "selected"]),
    ...mapGetters("products", ["variations", "variationId", "productImages"]),
    isDisabled() {
      //console.log("vid", this.variationId);
      return this.variationId === null || this.addingToCart;
    },
    sanitizedDescription() {
      return this.$sanitize(this.product.description);
    },
  },
  methods: {
    ...mapMutations("products", ["selectVariant"]),
    ...mapActions("cart", ["addToCart"]),
    ...mapActions("wishlist", ["addToWishlist", "removeFromWishlist"]),

    buttonSelected(name, value) {
      ////console.log(name + value)
      for (let i of this.selected) {
        if ((i.name == name) & (i.value == value)) {
          return true;
        }
      }

      return false;
    },
    async select(name, value) {
      if (!this.buttonSelected(name, value)) {
        let variant_ = {
          name: name,
          value: value,
        };
        this.selectVariant(variant_);
      }
    },

    async add2Cart() {
      ////console.log('p',this)
      this.addingToCart = true;
      let details = {
        productId: this.product.id,
        variationId: this.variationId,
        quantity: 1,
      };
      let { loading, errors } = await this.addToCart(details);
      this.disableAddToCart = loading;
      this.errors = errors;
      this.addingToCart = loading;
    },
    AddToWishlist() {
      if (this.wishlisted) {
        this.removeFromWishlist(this.product.id);
        this.wishlisted = false;
      } else {
        this.addToWishlist(this.product.id);
        this.wishlisted = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
#product-details {
  font-family: Poppins, sans-serif;
  margin-bottom: 50px;
  width: 30%;
  margin-left: 3%;
  margin-right: auto;
}

#product-carousel {
  width: 55%;
  margin-left: auto;
}

@media only screen and (max-width: 980px) {
  #product-details {
    width: 100vw;
  }
}

@media only screen and (max-width: 980px) {
  #product-carousel {
    width: 100vw;
  }
}

#tocart {
  border-radius: 5px;
  font-weight: bold;
  color: #ffff !important;
}
.price {
  font-size: 20px;
  font-weight: medium;
}
.price span {
  margin-right: 8px;
}

.color-selector {
  border: 2px solid white !important ;
}
</style>
