<template>
  <v-container class="login">
    <p>Welcome Back</p>

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
      v-model="User.password"
      outlined
      color="#266150"
      placeholder="*********"
      label="password"
      required
    >
    </v-text-field>

    <v-btn
      @click="login"
      tile
      color="#266150"
      width="100%"
      class="white--text"
      :elevation="loginElevation"
    >
      Login
    </v-btn>
    <div class="mt-5">
      <span>New User</span>
      <span class="ml-5">
        <v-btn
          @click="signup"
          tile
          color="#000"
          width="40%"
          class="white--text"
          :elevation="loginElevation"
        >
          Sign Up
        </v-btn>
      </span>
    </div>
    <p id="forgot_password" @click="$router.push('forgot-password')">
      Forgot Password
    </p>
  </v-container>
</template>

<script>
//import {LOGIN_EMAIL} from '../graphql/mutations/auth.js';

export default {
  name: "login",
  components: {},
  data() {
    return {
      success: false,
      User: {
        email: "super@gmail.com",
        password: "test123",
      },
    };
  },
  computed: {},

  methods: {
    async login() {
      let success = await this.$store.dispatch(
        "user/logInWithEmail",
        this.User
      );
      let redirect_url = new URLSearchParams(window.location.search).get(
        "redirect"
      );

      if (success) {
        this.success = true;
        if (
          redirect_url !== null &&
          redirect_url !== undefined &&
          redirect_url !== ""
        ) {
          this.$router.push(redirect_url);
        } else {
          this.$router.push({ name: "home" });
        }
      } else {
        this.success = false;
      }
    },
    signup() {
      this.$router.push("signup");
    },
  },
};
</script>
<style scoped>
.login {
  text-align: center;
}
.login p:nth-child(1) {
  font-family: Cormorant Garamond, "serif";
  font-weight: 400;
  font-size: 40px;
  color: #4f4846;
}

#forgot_password {
  margin-top: 20px;
  color: grey;
  font-weight: bold;
  font-size: 18px;
}
</style>
