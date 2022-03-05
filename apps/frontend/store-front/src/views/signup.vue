<template>
  <v-container class="signup">
    <p>Register</p>

    errors: {{ errors }}

    <v-text-field
      v-model="User.email"
      placeholder="myname@domain.com"
      label="Email"
      outlined
      color="#266150"
      required
    >
    </v-text-field>
    <v-text-field
      v-model="User.username"
      placeholder="johnDoe"
      label="Username"
      outlined
      color="#266150"
      required
    >
    </v-text-field>
    <v-text-field
      type="password"
      v-model="User.password1"
      outlined
      color="#266150"
      placeholder="*********"
      label="password"
      required
    >
    </v-text-field>
    <v-text-field
      type="password"
      v-model="User.password2"
      outlined
      color="#266150"
      placeholder="*********"
      label="password"
      required
    >
    </v-text-field>
    <v-btn
      @click="signup"
      tile
      color="#266150"
      width="100%"
      class="white--text"
      elevation="4"
    >
      SIGN UP
    </v-btn>
    <div class="mt-5">
      <span id="signup_label">Already A User</span>
      <span>
        <v-btn
          @click="login"
          tile
          color="#000"
          width="40%%"
          class="white--text ml-5"
          :elevation="1"
        >
          LOG IN
        </v-btn>
      </span>
    </div>
  </v-container>
</template>

<script>
//import {LOGIN_EMAIL} from '../graphql/mutations/auth.js';

export default {
  name: "login",
  components: {},
  data() {
    return {
      User: {
        email: "mailtoaabid@ymail.com",
        password1: "cjbnsdjhbhjBhhj87646!!",
        password2: "cjbnsdjhbhjBhhj87646!!",
        username: "",
      },
      errors: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.User;
    },
  },

  methods: {
    login() {
      this.$router.push("login");
    },
    async signup() {
      let { errors, success } = await this.$store.dispatch(
        "user/registerUser",
        this.User
      );
      //console.log("errors",errors,success)
      if (success == true) {
        //console.log("no errors")
        this.$router.push("/verification-link-sent?email=" + this.User.email);
      } else {
        this.errors = errors;
      }
    },
  },
};
</script>
<style scoped>
.signup {
  text-align: center;
}
.signup p:nth-child(1) {
  font-family: Cormorant Garamond, "serif";
  font-weight: 400;
  font-size: 40px;
  color: #4f4846;
}
</style>
