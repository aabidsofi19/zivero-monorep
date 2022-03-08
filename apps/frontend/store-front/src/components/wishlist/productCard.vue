<template>
  <v-card class="pa-0" outlined tile>
    <v-img @click="goToProduct()" class="product-image" :src="image">
      <v-icon
        class="float-right ma-5 rounded-circle white pa-2 cursor-pointer"
        @click.stop="removeProduct()"
      >
        mdi-close
      </v-icon>
    </v-img>

    <v-container class="productDetails d-flex flex-column pa-0 ma-0">
      <div class="d-flex justify-space-between align-end mb-0 px-1 kpoppins">
        <span class="text-overline">{{ brandName }}</span>
      </div>
      <div class="d-flex details flex-column justify-space-around mt-0">
        <span class="ma-0 px-1 grey--text text-md-h6 text-caption">{{
          name
        }}</span>
        <span class="ma-0 px-1 d-flex justify-space-between">
          <span id="price"> {{ price }} </span>
          <span
            id="mrp"
            class="text-caption text-decoration-line-through green--text"
          >
            $560
          </span>
        </span>
      </div>
      <div outlined tile class="">
        <v-btn
          @click="openDialog"
          block
          class="secondary--text font-weight-bold"
          flat
          tile
          color="white"
          elevation="0"
        >
          Add to bag
        </v-btn>
      </div>
    </v-container>

    <selectVariation
      :productId="id"
      :open="addToCartDialog"
      @close="closeDialog"
      :loading="loadingVariation"
    />
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import selectVariation from "../products/selectVariation.vue";
export default {
  props: ["name", "brandName", "price", "image", "id", "discount"],

  components: {
    selectVariation,
  },
  data: () => ({
    addToCartDialog: false,
    loadingVariation: true,
  }),
  methods: {
    ...mapActions("wishlist", ["removeFromWishlist"]),
    goToProduct() {
      this.$router.push({ name: "product", params: { id: this.id } });
    },
    removeProduct() {
      this.removeFromWishlist(this.id);
    },
    closeDialog(v) {
      this.addToCartDialog = v;
    },

    async openDialog() {
      this.addToCartDialog = true;
      //console.log("fetching product")
      let id = this.id;
      let { errors, loading } = await this.$store.dispatch(
        "products/getProduct",
        id
      );
      this.errors = errors;
      this.loadingVariation = loading;
    },
  },
};
</script>

<style scoped lang="css">
.product-image {
  height: 40vh;
}

@media screen and (min-width: 700px) {
  .product-image {
    height: 400px;
  }
}
</style>
