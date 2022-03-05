<template>
  <v-dialog v-model="propModel" max-width="500px" width="70%">
    <div v-if="loading">loading</div>
    <v-container class="white pa-5" v-else>
      <div
        class="pa-2 mb-2 white"
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
      <v-btn
        class=""
        @click="add2Cart"
        color="primary"
        elevation="0"
        x-large
        block
        :loading="addingToCart"
        :disabled="isDisabled"
      >
        Done
      </v-btn>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  props: ["productId", "open", "loading"],

  // async mounted() {
  //     //console.log("mounted")
  //     let id = this.productId;
  //     let {errors,loading}=await this.$store.dispatch("products/getProduct", id);
  //     this.errors=errors;
  //     this.loadingProduct=loading;
  // },
  data: () => ({
    addingToCart: false,
  }),
  computed: {
    ...mapState("products", ["product", "selected"]),
    ...mapGetters("products", ["variations", "variationId"]),
    propModel: {
      get() {
        return this.open;
      },
      set(value) {
        this.$emit("close", value);
      },
    },
    isDisabled() {
      return this.variationId === null || this.addingToCart;
    },
  },
  methods: {
    ...mapMutations("products", ["selectVariant"]),
    ...mapActions("cart", ["addToCart"]),
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
      this.$emit("close", false);
    },
  },
};
</script>
