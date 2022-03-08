<template>
  <footer class="navigation">
    <v-bottom-navigation
      class="pa-1 px-2 d-flex justify-space-around"
      height="60px"
      fixed
      color="#fdf8f5"
      horizontal
      hide-on-scroll
    >
      <div class="d-flex flex-column mx-2 details">
        <span class="black--text text-subtitle font-weight-black"
          >Rs {{ cart.totalPrice }}</span
        >
        <span
          class="total text--subtitle text-uppercase poppins font-weight-bold"
          >Total {{ cart.cartLength }} items</span
        >
      </div>

      <v-btn
        :loading="loading"
        :disabled="disabled"
        color="primary"
        elevation="2"
        rounded
        height="50px"
        width="200px"
        class="rounded"
      >
        <span class="white--text checkout-button" @click="$emit('submit')">
          {{ btnLabel }}</span
        >
      </v-btn>
    </v-bottom-navigation>
  </footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "checkoutBottomnavigation",
  props: ["btnLabel", "disabled", "loading"],

  data: () => ({}),
  computed: {
    ...mapState("cart", ["cart"]),
  },
};
</script>
<style scoped>
.navigation {
  padding: 0px;
}
.checkout-button {
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
}
.total {
  color: #ddaf94;
}
</style>
