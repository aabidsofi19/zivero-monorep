<template>
  <div class="search d-flex" v-if="isSearchOpen">
    <v-sheet class="search-container" width="100%" elevation="10">
      <v-card
        tile
        class="my-5 pa-6 d-flex justify-center align-items-center"
        elevation="5"
      >
        <span class="search-input d-flex justify-center align-items-center">
          <v-text-field
            flat
            autofocus
            onblur="(t)=>t.focus()"
            solo
            ref="search"
            label="Search"
            prepend-icon="mdi-magnify"
            @click:prepend-icon="searchProducts"
            v-model="search"
            @keyup.enter="searchProducts"
            class="mb-0"
          ></v-text-field>

          <v-btn
            elevation="0"
            class="mt-2"
            color="white"
            @click="setSearchOpen(false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </span>
      </v-card>

      <v-sheet class="pa-4 suggestions" v-if="autocompleteResults.length > 0">
        <p
          class="text-center text-h6 font-weight-bold text-uppercase my-4 grey--text"
        >
          Suggestions for your search :
        </p>
        <div class="d-flex justify-center align-items-center">
          <products-grid :productChunks="productChunks"></products-grid>
        </div>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<script>
import productsGrid from "../products/productsGrid.vue";
import { chunk } from "lodash";
//import productCard from "./autocompleteResult.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    productsGrid,
  },

  data: () => ({
    open: true,
    search: "",
    searching: false,
  }),
  computed: {
    ...mapState("search", ["autocompleteResults", "isSearchOpen"]),

    productChunks() {
      return chunk(this.autocompleteResults, 4) ?? [];
    },
  },
  methods: {
    ...mapActions("search", ["searchAutocomplete"]),
    ...mapMutations("search", ["setSearchOpen"]),
    searchProducts() {
      this.$router.push("/search-results/" + this.search);
      this.setSearchOpen(false);
    },
    async autoComplete() {
      if (!this.searching) {
        this.searching = true;
        await this.searchAutocomplete(this.search);
        this.searching = false;
      }
    },
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        this.autoComplete();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.432);
  overflow-y: scroll;
  z-index: 100;
}

.search-container {
  width: 100%;
  height: max-content;
}
.search-input {
  width: 80%;
}

.product-card {
  width: 55%;
}

@media screen and (min-width: 700px) {
  .product-card {
    width: 18%;
  }
}
</style>
