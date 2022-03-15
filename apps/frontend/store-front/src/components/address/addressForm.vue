<template>
  <div class="ma-0 addressForm pa-0 white">
    <form @submit.prevent="submit">
      <div class="contact-details">
        <div class="grey lighten-2 pa-3">
          <span class="ma-0 pa-0 text-button"> Contact details </span>
        </div>
        <div class="pa-2">
          <v-text-field
            required
            autocomplete
            v-model="address.name"
            label="Name"
            outlined
          ></v-text-field>
          <v-text-field
            required
            autocomplete
            v-model="address.phoneNumber"
            label="Mobile No"
            outlined
          ></v-text-field>
        </div>
      </div>
      <div class="address-details">
        <div class="grey lighten-2 pa-3">
          <span class="ma-0 pa-0 text-button"> Address</span>
        </div>
        <div class="pa-2">
          <v-text-field
            required
            autocomplete
            v-model="address.pincode"
            label="Pincode"
            outlined
          ></v-text-field>
          <v-text-field
            required
            type="number"
            autocomplete
            v-model="address.apartmentNo"
            label="Apartment No"
            outlined
          ></v-text-field>
          <v-text-field
            required
            v-model="address.town"
            label="locality/town"
            outlined
          ></v-text-field>
          <v-text-field
            required
            v-model="address.city"
            label="city/district"
            outlined
          ></v-text-field>
          <v-text-field
            required
            v-model="address.state"
            label="State"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="address.country"
            label="Country"
            outlined
          ></v-text-field>

          <div>
            <p class="text-button font-weight-bold">Save Address As</p>

            <v-btn
              class="rounded-pill mr-7"
              outlined
              :class="{ 'green darken-2': address.isHome }"
              @click="setAsHome()"
            >
              Home
            </v-btn>
            <v-btn
              class="rounded-pill mr-7"
              outlined
              :class="{ 'green darken-2': address.isWork }"
              @click="setAsWork()"
            >
              Work
            </v-btn>
          </div>
          <v-checkbox v-model="address.isPrimary" class="">
            <template v-slot:label>
              <div class="text-button font-weight-bold black--text">
                Set As Default Address
              </div>
            </template>
          </v-checkbox>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["update"],

  mounted() {
    if (this.update) {
      let address = this.$store.state.addresses.addressToUpdate;
      this.address = address;
    }
  },
  data() {
    return {
      address: {
        name: "",
        pincode: "",
        state: "",
        country: "",
        city: "",
        town: "",
        apartmentNo: "",
        isPrimary: false,
        isWork: false,
        isHome: true,
        phoneNumber: "",
      },
    };
  },

  methods: {
    setAsHome() {
      this.address.isHome = !this.address.isHome;
      this.address.isWork = false;
    },
    setAsWork() {
      this.address.isHome = false;
      this.address.isWork = !this.address.isWork;
    },
  },
};
</script>

<style>
.addressForm {
  width: 100%;
  max-width: 600px;
}

.outlined {
  border: 1px solid black;
}
</style>
