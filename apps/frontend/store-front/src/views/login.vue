<template>
  <v-container class="py-4 px-3">
    <p class="text-h4 font-weight-semiBold">Welcome Back</p>
    <div v-if="errors.nonFieldErrors">
      <p
        v-for="(error, i) in errors.nonFieldErrors"
        :key="i"
        class="red--text pa-2 text-caption red lighten-5 rounded"
      >
        {{ error.code }} : {{ error.message }}
      </p>
    </div>
    <v-form @submit.prevent>
      <v-text-field
        autocomplete
        v-model="User.email"
        placeholder="myname@domain.com"
        label="Email"
        :error-messages="emailErrors"
        type="email"
        outlined
        color="#266150"
        required
      >
      </v-text-field>
      <v-text-field
        autocomplete
        required
        :error-messages="passwordErrors"
        v-model="User.password"
        outlined
        type="password"
        color="#266150"
        placeholder="*********"
        label="password"
      >
      </v-text-field>
      <v-btn
        @click="login"
        tile
        type="submit"
        :loading="signingIn"
        color="primary"
        width="100%"
        elevation="0"
        class="white--text"
      >
        Login
      </v-btn>
    </v-form>

    <div class="mt-5 text-center">
      <span>New User</span>
      <span class="ml-5">
        <v-btn
          @click="signup"
          tile
          color="accent"
          width="40%"
          elevation="0"
          class="white--text"
        >
          Sign Up
        </v-btn>
      </span>
    </div>
    <p
      @click="$router.push('forgot-password')"
      class="text-center my-3 cursor-pointer secondary--text"
    >
      Forgot Password
    </p>
  </v-container>
</template>

<script>
//import {LOGIN_EMAIL} from '../graphql/mutations/auth.js';
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "login",
  mixins: [validationMixin],
  components: {},
  data() {
    return {
      success: false,
      signingIn: false,
      errors: [],
      User: {
        email: "super@gmail.com",
        password: "test123",
      },
    };
  },

  validations: {
    User: {
      email: { required, email },
      password: { required },
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.User.email.$dirty) return errors;

      !this.$v.User.email.email && errors.push("Must be valid e-mail");
      !this.$v.User.email.required && errors.push("E-mail is required");

      this.errors &&
        this.errors.email &&
        errors.push(this.errors.email.map((err) => err.message));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.User.password.$dirty) return errors;
      !this.$v.User.password.required && errors.push("password is missing");
      return errors;
    },
  },

  methods: {
    async login() {
      this.$log.debug("$v", this.$v);
      this.$v.User.$touch();

      if (this.$v.User.$invalid) {
        return;
      }

      this.signingIn = true;
      let { success, errors } = await this.$store.dispatch(
        "user/logInWithEmail",
        this.User
      );
      this.errors = errors;
      this.success = success;
      this.signingIn = false;
      this.$log.debug("success", success, errors);

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
