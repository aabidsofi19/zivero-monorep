<template>
  <loading v-if="loadingAddresses"> </loading>
  <div v-else>
    <div class="container d-flex flex-wrap justify-center main-container">
      <div class="addresses py-3">
        <checkoutProgress address="true" />
        <div class="white py-4 d-flex justify-space-between">
          <span class="text-h6 font-weight-bold"> Select Delivery Address</span>
          <v-btn outlined class="" @click="addAddress()">
            Add New Addrress
          </v-btn>
        </div>

        <div class="default-address">
          <p class="text-button">default Address</p>

          <addressCard
            :address="defaultAddress"
            v-if="defaultAddress"
            @updateAddress="updateAddress"
          />
        </div>

        <div class="other-addresses">
          <p class="text-button py-2">Other Addresses</p>

          <addressCard
            @updateAddress="updateAddress"
            v-for="(address, i) of addresses"
            :key="i"
            :address="address"
          />
        </div>
      </div>

      <div class="price-details">
        <v-card
          elevation="0"
          outlined
          rounded
          class="mt-2 pa-2 pb-8 d-flex flex-column"
        >
          <paymentDetails></paymentDetails>

          <v-btn
            color="#266150"
            tile
            elevation="1"
            class="white--text continue-btn"
            @click="goToPayment()"
            :loading="submitting"
            :disabled="btnDisabled"
          >
            Continue
          </v-btn>
          <checkoutBottomNavigation
            :loading="submitting"
            :disabled="btnDisabled"
            class="bottom-navigation"
            btnLabel="Continue"
            @submit="goToPayment()"
          >
          </checkoutBottomNavigation>
        </v-card>
      </div>
    </div>
    <!--Price details -->

    <addressDialog :open="dialog" @updateDialog="close"> </addressDialog>
    <updateAddressDialog
      ref="updateAddressDialog"
      :open="updateDialog"
      @updateDialog="closeUpdate"
    >
    </updateAddressDialog>
  </div>
</template>

<script>
//import {"mapGetters","mapState"} from "vuex";
import addressCard from "../components/address/addressCard";
import checkoutProgress from "../components/checkout/checkoutProgress.vue";
import addressDialog from "../components/address/addressDialog.vue";
import updateAddressDialog from "../components/address/updateAddressDialog.vue";
import paymentDetails from "../components/checkout/paymentDetails.vue";
import checkoutBottomNavigation from "../components/checkout/checkoutBottomNavigation.vue";
import loading from "../components/cart/loading.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    addressCard,
    checkoutProgress,
    addressDialog,
    updateAddressDialog,
    paymentDetails,
    checkoutBottomNavigation,
    loading,
  },
  data() {
    return {
      dialog: false,
      updateDialog: false,
      loadingAddresses: true,
      submitting: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("cart/fetchCart");
    this.loadingAddresses = await this.fetchAddresses();
    // this.fetchDefaultAddress();
  },

  computed: {
    ...mapState("addresses", [
      "addresses",
      "defaultAddress",
      "selectedAddress",
    ]),
    btnDisabled() {
      return this.submitting || !this.selectedAddress.id;
    },
  },

  methods: {
    ...mapActions("addresses", ["fetchAddresses", "addAddress"]),
    ...mapActions("orders", ["createOrder"]),
    ...mapMutations("addresses", ["setAddressToUpdate"]),
    addAddress() {
      this.dialog = true;
      // this.$router.push({name:'addAddress'})
    },
    updateAddress(address) {
      this.setAddressToUpdate(address);
      this.updateDialog = true;
      let updateDialog = this.$refs.updateAddressDialog;
      const addressForm = updateDialog.$refs.addressForm;
      if (addressForm) {
        addressForm.address = address;
      }
    },

    close(v) {
      this.dialog = v;
    },

    closeUpdate(v) {
      this.updateDialog = v;
    },

    async goToPayment() {
      this.submitting = true;
      let { loading, errors } = await this.createOrder();
      this.submitting = loading;
      if (!errors) {
        this.$router.push({ name: "payment" });
      }
      //
    },
  },
};
</script>

<style scoped lang="scss">
.main-container {
  .addresses {
    width: 100%;
  }
  .price-details {
    width: 100vw;
    margin-bottom: 60px;
  }
  .continue-btn {
    display: none;
  }
  @media only screen and (min-width: 600px) {
    .addresses {
      width: 65%;
    }
  }
  @media only screen and (min-width: 600px) {
    .price-details {
      padding-left: 3%;
      width: 30%;
    }

    .bottom-navigation {
      display: none;
    }

    .continue-btn {
      display: block;
    }
  }
}
</style>
