<template>
  <div class="mb-4 w-full productGrid">
    <v-row v-for="chunk in productChunks" class="pa-0 ma-0 w-full" :key="chunk">
      <v-col
        class="ma-0 pa-0"
        v-for="product in chunk"
        :key="product.id"
        cols="6"
        sm="4"
        md="4"
        lg="3"
      >
        <productCard
          class="ma-1"
          :name="product.name"
          :brandName="product.brand.name"
          :price="product.price"
          :image="product.images[0]"
          :id="product.id"
          :discountPercent="product.discountPercent"
        ></productCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productCard from "./productCard.vue";
export default {
  name: "productsGrid",
  components: {
    productCard,
  },
  props: ["productChunks"],
  mounted() {
    // this.observer.observe(this.$refs.loader);
  },
  data() {
    return {
      products: "",
      hello: "",
      itemsPerRow: 2,
    };
  },

  methods: {
    goToProduct(id) {
      this.$router.push(`/products/${id}`);
    },
  },
};
</script>

<style>
.productGrid {
  width: 100%;
}
</style>
