<template>
  <v-card outlined elevation="0" class="py-3 my-4">
    <v-container class="d-flex">
      <v-checkbox v-model="selected"></v-checkbox>
      <v-container>
        <p class="ma-0 py-1 text-bold text-h6">
          {{ address.name }}
          <v-chip class="mx-4" small outlined color="green">
            <span v-if="address.isHome">Home</span>
            <span v-if="address.isWork">Work</span>
          </v-chip>
        </p>
        <div class="text-grey">
          <p class="text-caption mx-0 px-0">
            {{ address.apartmentNo }}. {{ address.town }} .{{ address.city }} .
            {{ address.state }} -{{ address.pincode }}
          </p>
          <p class="ma-0 py-1 text-subtitle">
            Mobile <b>{{ address.phoneNumber }}</b>
          </p>
        </div>
        <v-container
          class="py-2 px-0 mx-0 d-flex justify-start"
          v-if="selected"
        >
          <v-btn outlined @click="$emit('updateAddress', address)"> Edit</v-btn>
          <v-btn outlined class="mx-4" @click="removeAddress()"> Remove</v-btn>
        </v-container>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  props: ["address"],
  data() {
    return {};
  },
  methods: {
    ...mapActions("addresses", ["deleteAddress"]),
    ...mapMutations("addresses", ["setSelectedAddress"]),
    select() {
      this.selected = !this.selected;
    },
    removeAddress() {
      this.deleteAddress(this.address.id);
    },
  },

  computed: {
    ...mapState("addresses", ["selectedAddress"]),
    selected: {
      get() {
        return this.address.id == this.selectedAddress.id;
      },
      set(value) {
        if (value == true) {
          this.setSelectedAddress(this.address);
        } else {
          this.setSelectedAddress({ id: null });
        }
      },
    },
  },
};
</script>
