<template>
  <div>
    <v-overlay v-if="loading">
      <div class="d-flex flex-column justify-center align-center">
        <v-progress-circular indeterminate> </v-progress-circular>
        <p class="text-h4 font-weight-bold text-center my-5">Verifying</p>
      </div>
    </v-overlay>

    <v-sheet
      v-if="success == true"
      height="90vh"
      class="d-flex justify-center align-center px-6"
    >
      <v-card
        width="350px"
        height="auto"
        color="tan"
        class="pa-8 d-flex flex-column justify-space-center align-center"
      >
        <v-sheet
          height="100px"
          color="pink"
          width="100px"
          class="mb-5 mt-8 rounded-circle"
        >
        </v-sheet>
        <p class="text-h4 font-weight-bold mb-4">Verified !</p>
        <p class="text-h6 mb-4 text-center">
          Voila ! You have succesfully verified the account
        </p>
        <p class="text-subtitle-1 text-center mb-4 font-weight-bold grey--text">
          Shop exclusive and premium deals now
        </p>
        <v-btn block class="mb-8 green white--text"> Start Shopping </v-btn>
      </v-card>
    </v-sheet>
    <div>{{ errors }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  async mounted() {
    let token = this.$route.params.token;
    //console.log("token",token)
    let { success, errors } = await this.confirmEmail(token);
    this.success = success;
    this.errors = errors;
    this.loading = false;
  },
  data: () => ({
    loading: true,
    success: false,
    errors: null,
  }),
  methods: {
    ...mapActions("user", ["confirmEmail"]),
  },
};
</script>
