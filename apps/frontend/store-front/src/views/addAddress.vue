<template>
  <div class="red d-flex justify-center" >
    <address-form />
    <div class="mt-8"></div>
    <v-app-bar fixed bottom dense color="" class="pb-2">
      <v-btn color="green lighten-2 " width="100%"> Add Address</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import addressForm from "../components/address/addressForm.vue";
export default {
  components: { addressForm },
  data() {
    return {};
  },
};
</script>