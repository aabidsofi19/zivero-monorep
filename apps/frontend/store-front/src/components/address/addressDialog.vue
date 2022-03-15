<template>
  <v-dialog v-model="propModel" width="450px">
    <div class="white">
      <div
        class="py-6 px-4 text-h5 font-weight-bold d-flex justify-space-between"
      >
        <span>Add Address</span>
        <v-icon @click="propModel = false"> mdi-close</v-icon>
      </div>
      <addressForm class="form" ref="addressForm"></addressForm>
      <div class="bottom-nav rounded elevation-4">
        <v-btn
          color="green white--text py-6"
          width="100%"
          tile
          @click="submit()"
        >
          Add Address</v-btn
        >
      </div>
    </div>
  </v-dialog>
</template>

<script>
import addressForm from "./addressForm.vue";
import { mapActions } from "vuex";
export default {
  components: {
    addressForm,
  },
  props: ["open"],

  computed: {
    propModel: {
      get() {
        return this.open;
      },
      set(value) {
        this.$emit("updateDialog", value);
      },
    },
  },
  methods: {
    ...mapActions("addresses", ["addAddress"]),
    submit() {
      let address = this.$refs.addressForm.address;

      this.addAddress(address);
      this.propModel = false;
    },
  },
};
</script>
<style scoped lang="scss">
.bottom-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  border-top: 0.5px solid lightgrey;
  padding-inline: 2%;
  padding-block: 2%;
}
</style>
