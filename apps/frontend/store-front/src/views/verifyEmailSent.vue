<template>
  <v-sheet height="90vh" color="d-flex justify-center align-center">
    <v-container
      class="login d-flex flex-wrap align-center justify-space-around"
    >
      <v-sheet color="green" height="auto" width="50%" min-width="450px">
        <v-img
          src="../assets/message-sent-concept-illustration_114360-3363.jpg"
        ></v-img>
      </v-sheet>
      <v-sheet height="100%" width="50%" min-width="450px" class="pl-8">
        <p class="text-h5 font-weight-bold">Verification Link Sent</p>
        <p class="text-h6 mt-8">
          We emailed a confirmation link to your email <b>{{ email }}</b>
        </p>
        <p class="text-h6 mb-8">Check your mail to signin and verify</p>

        <p class="text-subtitle-3 grey--text font-weight-bold mt-4">
          Did'nt get a confirmation email?
        </p>
        <p class="text-subtitle-3 grey--text font-weight-bold">
          check your spam or
          <v-btn
            small
            outlined
            :disabled="resendDisabled"
            class="mx-3 blue--text lighten-4"
            @click="resendEmail"
          >
            resend
            <span v-if="timerCount > 0"> in {{ timerCount }} secs </span>
          </v-btn>
        </p>
      </v-sheet>
    </v-container>
  </v-sheet>

  <!-- <p>VERIFY YOUR EMAIL</p>
        <p> Link to verify your account has been sent your mail </p>     
    
   
    <div class='mt-5'>
    <span>Not recieved email yet</span>
    <span class="ml-5">
      <v-btn @click='signup' tile color='#000' width='30%'
        class ='white--text'
        >
        Resend
    </v-btn>
    </span>
    </div> -->
</template>

<script>
//import {LOGIN_EMAIL} from '../graphql/mutations/auth.js';
import { mapActions } from "vuex";
export default {
  name: "confirmEmail",
  components: {},
  data() {
    return {
      Code: "",
      errors: null,
      //resendDisable:false ,
      timerCount: 0,
    };
  },
  computed: {
    email() {
      return this.$route.query.email;
    },
    resendDisabled() {
      //console.log(this.timerCount > 0)
      return this.timerCount > 0;
    },
  },
  methods: {
    ...mapActions("user", ["confirmEmail", "resendActivationEmail"]),
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    async resendEmail() {
      this.timerCount = 110;
      this.resendActivationEmail(this.email);

      //console.log("res resend",data)
    },
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
};
</script>
<style scoped></style>
