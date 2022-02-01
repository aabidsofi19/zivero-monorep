<template>
  <v-card>
    <v-card-heading> Product Organisation </v-card-heading>
    <v-card-body>
      <v-input
        label="Category"
        placeholder="search categories"
      ></v-input>
      <v-input
        label="Brand"
        placeholder="search brand"
      ></v-input>
      <v-input
        label="Gender"
        placeholder="Men"
      ></v-input>
      <v-input label="Tags"></v-input>
    </v-card-body>
  </v-card>
</template>

<script>
import { VCardBody, VCard, VCardHeading } from './AppCard.vue'
import VInput from './BaseInput.vue'

export default {
  components: {
    VCardHeading,
    VInput,
    VCardBody,
    VCard,
  },
}
</script>
