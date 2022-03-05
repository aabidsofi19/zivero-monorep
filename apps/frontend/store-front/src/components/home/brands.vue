<template>
  <v-container fluid class="brand-poster">
    <p class="text-h4 font-weight-bold pl-2 py-4">Popular Brands</p>

    <div class="d-flex flex-wrap">
      <v-img
        class="img mx-1 rounded my-1 grey lighten-5"
        v-for="(brand, i) in brands"
        :key="i"
        :src="brand.logo"
        :alt="brand"
        @click="filterByBrand(brand)"
      >
        <div
          class="brand-name d-flex justify-center align-center background--text text-md-h5 text-h6 font-weight-bold text-uppercase"
        >
          <v-btn color="white" tile outlined>
            {{ brand.name }}
          </v-btn>
        </div>
      </v-img>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "brands",
  props: {
    brands: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions("products", ["addTempFilter"]),
    filterByBrand(brand) {
      let filter = {
        brands: [brand.id],
      };

      this.$router.push({
        name: "products",
        query: {
          filter: JSON.stringify(filter),
        },
      });
    },
  },
};
</script>

<style scoped>
.brand-poster {
  cursor: pointer;
}

.img {
  width: 30vw;
  height: 32vh;
}

@media screen and (min-width: 600px) {
  .img {
    width: 20vw;
    height: 45vh;
  }
}

.brand-name {
  height: 100%;
  background-color: rgba(65, 64, 64, 0.411);
}
</style>
