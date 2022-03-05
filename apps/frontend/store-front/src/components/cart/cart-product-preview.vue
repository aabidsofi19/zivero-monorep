<template>
  <div class="product-preview container rounded">
    <!-- {{cartObject}}
    {{product}} -->

    <v-row height="">
      <v-col cols="3">
        <v-img
          class="product-image mb-1"
          contain
          :src="orderItemImage(product, variation)"
          height="200px"
        >
        </v-img>
      </v-col>
      <v-col cols="9">
        <div
          class="product-details d-flex flex justify-space-between align-space-around text-capitalize"
        >
          <div class="pl-4">
            <div class="text-h6 font-weight-bold">{{ product.brand.name }}</div>
            <div class="grey--text text-subtitle-1">{{ product.name }}</div>

            <div class="quantity py-4 mx-0 justify-start align-center">
              <div>
                <!--quantity-->
                <v-icon class="mx-1" @click="quantityPlus()" color="darkGrey">
                  mdi-plus
                </v-icon>

                <span class="mx-2">
                  {{ quantity }}
                </span>

                <v-icon class="mx-1" @click="quantityMinus()" color="darkGrey">
                  mdi-minus
                </v-icon>
              </div>

              <!-- selected variants -->
              <div class="d-flex justify-start py-5">
                <span
                  class="mr-4 grey darken-2 text-button rounded white--text px-3"
                  v-for="(varaint, index) in variation.variant"
                  :key="index"
                >
                  {{ varaint.value }}
                </span>
              </div>
            </div>
          </div>

          <div class="py-3 pr-4">
            <p class="text-subtitle-1 font-weight-bold">Rs {{ price }}</p>
            <p>
              <span class="text-decoration-line-through grey--text"
                >Rs {{ undiscountedPrice }}</span
              >
              <span class="poppins red--text">
                {{ variation.discountPercent }} % OFF
              </span>
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <div
      class="darkGrey--text d-flex justify-space-around align-space-between mt-3"
    >
      <span class="link" @click="remove()">Remove</span>
      <v-divider vertical class=""></v-divider>
      <span class="link">Move To Wishlist</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "cartProduct",
  props: ["cartObject"],
  components: {},
  data() {
    return {
      price: this.cartObject.price,
      totalPrice: this.cartObject.totalPrice,
      quantity: this.cartObject.quantity,
      product: this.cartObject.product,
      variation: this.cartObject.variation,
      items: ["xl", "l"],
      selectedVariant: "xl",
    };
  },
  computed: {
    ...mapGetters("orders", ["orderItemImage"]),
    undiscountedPrice: function () {
      return this.price + this.price * (this.variation.discountPercent / 100);
    },
  },
  methods: {
    ...mapActions("cart", ["updateCart"]),

    UpdateCart() {
      let details = {
        productId: this.product.id,
        variationId: this.variation.Id,
        quantity: this.quantity,
      };
      this.updateCart(details);
    },
    quantityPlus() {
      this.quantity += 1;
      this.UpdateCart();
    },
    quantityMinus() {
      if (this.quantity >= 1) {
        this.quantity -= 1;
        this.UpdateCart();
      }
    },

    remove() {
      this.quantity = 0;
      this.UpdateCart();
    },
  },
  watch: {
    Quantity: function (oldQuantity, newQuantity) {
      //console.log("request sent", oldQuantity, newQuantity);
    },
  },
};
</script>
<style scoped lang="css">
.product-preview {
  border: 1px solid lightgrey;
}
.link {
  cursor: pointer;
}
</style>
