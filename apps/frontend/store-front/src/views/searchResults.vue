<template>
  <div>
    <loader v-if="loading"></loader>

    <v-container>
      <products-grid :product-chunks="searchResullChunks"></products-grid>
    </v-container>

    <v-btn
      block
      color="red"
      class="mb-4 white--text"
      @click="searchMoreProducts"
      v-show="hasNextPage"
      :loading="searchingMoreProducts"
      :disabled="searchingMoreProducts"
    >
      Search More
    </v-btn>
  </div>
</template>

<script>
import productsGrid from "../components/products/productsGrid.vue";
import { chunk } from "lodash";
import { mapState, mapActions } from "vuex";
import loader from "../components/products/loader.vue";
export default {
  components: { loader, productsGrid },
  computed: {
    ...mapState("search", ["productSearchResults"]),
    searchResullChunks() {
      return chunk(this.productSearchResults.results, 4);
    },
    hasNextPage() {
      return (
        this.productSearchResults.page < this.productSearchResults.totalPages
      );
    },
  },
  async mounted() {
    this.query = this.$route.params.query;

    await this.search({ query: this.query });
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      searchingMoreProducts: false,
      query: "",
    };
  },
  methods: {
    ...mapActions("search", ["search"]),
    async searchMoreProducts() {
      this.searchingMoreProducts = true;
      let payload = {
        pageNo: this.productSearchResults.page + 1,
        query: this.query,
        searchMore: true,
      };
      await this.search(payload);
      this.searchingMoreProducts = false;
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 49%;
  margin: 1%;
}

@media screen and (min-width: 700px) {
  .product-card {
    width: 25%;
  }
}
</style>
