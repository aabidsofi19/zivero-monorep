<template>
  <div>
    <div class="" v-if="!loading">
      <div class="white py-4 d-flex justify-space-between">
        <span class="text-h6 font-weight-bold"> Saved Address</span>
        <v-btn outlined class="" @click="addAddress()">
          Add New Addrress
        </v-btn>
      </div>

      <div class="default-address">
        <p class="text-button">default Address</p>

        <addressCard
          :address="defaultAddress"
          v-if="defaultAddress !== null"
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
import addressCard from "../address/addressCard";
import addressDialog from "../address/addressDialog.vue";
import updateAddressDialog from "../address/updateAddressDialog.vue";

import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    addressCard,
    addressDialog,
    updateAddressDialog,
  },
  data() {
    return {
      dialog: false,
      updateDialog: false,
      loading: true,
    };
  },
  async mounted() {
    this.loading = await this.fetchAddresses();

    //console.log("fetching cart data")
  },

  computed: {
    ...mapState("addresses", ["addresses", "defaultAddress"]),
  },

  methods: {
    ...mapActions("addresses", [
      "fetchAddresses",
      "fetchDefaultAddress",
      "addAddress",
    ]),

    ...mapMutations("addresses", ["setAddressToUpdate"]),
    addAddress() {
      //console.log("add address")
      this.dialog = true;
      // this.$router.push({name:'addAddress'})
    },
    updateAddress(address) {
      this.setAddressToUpdate(address);
      this.updateDialog = true;
      let updateDialog = this.$refs.updateAddressDialog;
      try {
        window.u = updateDialog;
        updateDialog.$refs.addressForm.address = address;
        //console.log(updateDialog.$refs.addressForm.address)
      } catch (e) {
        //console.log("")
      }
    },

    close(v) {
      //console.log("v",v)
      this.dialog = v;
    },

    closeUpdate(v) {
      //console.log("v",v)
      this.updateDialog = v;
    },
  },
};
</script>

<style scoped lang="scss">
// .main-container{
//     .addresses{
//         width:100%;
//     }

//     @media only screen and (min-width:600px){
//         .addresses{
//             width:65%;
//         }
//     }
//     @media only screen and (min-width:600px){
//         .price-details{
//             padding-left:3%;
//             width:30%;
//         }

//         .bottom-navigation{
//            display: none;
//         }

//         .continue-btn{
//             display: block
//         }
//     }
// }
</style>
