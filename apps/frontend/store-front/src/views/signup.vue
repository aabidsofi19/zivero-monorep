<template>
  <v-container class="signup">
    <p>Register</p>

    <div>
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
        v-model="User.email"
        placeholder="myname@domain.com"
        label="Email"
        outlined
        color="#266150"
        required
        :error-messages="emailErrors"
      >
      </v-text-field>
      <v-text-field
        v-model="User.username"
        placeholder="johnDoe"
        label="Username"
        outlined
        :error-messages="usernameErrors"
        color="#266150"
        required
      >
      </v-text-field>
      <v-text-field
        type="password"
        v-model="User.password1"
        outlined
        :error-messages="password1Errors"
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
        :error-messages="password2Errors"
        color="#266150"
        placeholder="*********"
        label="password"
        required
      >
      </v-text-field>
      <v-btn
        @click="signup"
        tile
        :loading="signingUp"
        color="#266150"
        width="100%"
        class="white--text"
        elevation="4"
      >
        SIGN UP
      </v-btn>
    </v-form>

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
import { validationMixin } from "vuelidate";
import { required, email, sameAs } from "vuelidate/lib/validators";

export default {
  name: "login",
  mixins: [validationMixin],
  components: {},
  data() {
    return {
      User: {
        email: "",
        password1: "",
        password2: "",
        username: "",
      },
      errors: [],
      signingUp: false,
    };
  },
  validations: {
    User: {
      username: { required },
      email: { required, email },
      password1: { required },
      password2: { required, sameAsPassword: sameAs("password1") },
    },
  },

  computed: {
    user() {
      return this.$store.state.User;
    },
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
    password1Errors() {
      const errors = [];
      if (!this.$v.User.password1.$dirty) return errors;
      !this.$v.User.password1.required && errors.push("password is missing");

      this.errors &&
        this.errors.password1 &&
        errors.push(this.errors.password1.map((err) => err.message));

      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.User.password2.$dirty) return errors;
      !this.$v.User.password2.required && errors.push("password is missing");
      !this.$v.User.password2.sameAsPassword &&
        errors.push("password mismatch");
      this.errors &&
        this.errors.password2 &&
        errors.push(this.errors.password2.map((err) => err.message));

      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.User.username.$dirty) return errors;
      !this.$v.User.username.required && errors.push("username is required");

      this.errors &&
        this.errors.username &&
        errors.push(this.errors.username.map((err) => err.message));

      return errors;
    },
  },

  methods: {
    login() {
      this.$router.push("login");
    },
    async signup() {
      this.$v.User.$touch();
      if (this.$v.User.$invalid) {
        return;
      }
      this.signingUp = true;
      let { errors, success } = await this.$store.dispatch(
        "user/registerUser",
        this.User
      );
      this.signingUp = false;
      if (success == true) {
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
