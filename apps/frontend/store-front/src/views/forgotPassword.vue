<template>
  <v-container>
    <p class="font-weight-bold text-h5">Forgot Your Password</p>
    <v-text-field
      v-model="email"
      placeholder="myname@domain.com"
      label="Email"
      outlined
      color="#266150"
      required
    >
    </v-text-field>
    <p v-if="success">Link to reset passoword sent</p>
    <p v-if="errors">{{ errors }}</p>
    <v-btn
      @click="sendLink"
      tile
      color="#266150"
      width="100%"
      :disabled="loading"
      :loading="loading"
      class="white--text"
      elevation="4"
    >
      Send
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    email: "",
    loading: false.loading,
    success: false,
    errors: null,
  }),
  methods: {
    ...mapActions("user", ["forgotPassword"]),
    async sendLink() {
      this.loading = true;
      let { success, errors } = await this.forgotPassword(this.email);
      //console.log("forgot",success,errors)
      this.success = success;
      this.errors = errors;
      this.loading = false;
    },
  },
};
</script>
