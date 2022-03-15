<template>
  <div class="container">
    <p class="black--text text-h5 my-8 font-weight-medium montserrat">
      My Wishlist ({{ totalItems }} items )
    </p>

    <div class="d-flex flex-wrap justify-start overflow-hidden">
      <product-card
        class="product-card mr-3 my-2 pa-0"
        :name="product.name"
        :image="product.images[0]"
        :price="product.price"
        :discount="product.discountPercent"
        v-for="product in wishlist.products"
        :key="product.id"
        :id="product.id"
        @remove="removeFromWishlist(id)"
      >
      </product-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import productCard from "../components/wishlist/productCard.vue";
export default {
  components: {
    productCard,
  },
  data() {
    return {
      loading: true,
    };
  },

  async mounted() {
    await this.fetchWishlist();
    this.loading = false;
  },

  computed: {
    ...mapState("wishlist", ["wishlist"]),
    totalItems() {
      return this.wishlist.products.length;
    },
  },

  methods: {
    ...mapActions("wishlist", ["fetchWishlist", "removeFromWishlist"]),
  },
};
</script>

<style scoped>
.product-card {
  width: 48%;
}

@media screen and (min-width: 700px) {
  .product-card {
    width: 25%;
  }
}
</style>
