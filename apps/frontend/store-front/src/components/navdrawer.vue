<template>
  <v-navigation-drawer
    class="d-block"
    stateless
    app
    clipped
    v-model="$store.state.app.is_navbar_open"
  >
    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item>
          <v-list-item-icon>
            <v-icon class="nav-icon">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push('/')">Home</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push('/profile/account')">
            Acount</v-list-item-title
          >
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push('/products')">
            Products
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isLoggedIn">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="logOut()"> Log Out </v-list-item-title>
        </v-list-item>
        <v-list-item v-else>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="$router.push('/login')">
            SignIn / Register
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "navDrawer",
  components: {},
  computed: {
    ...mapState("user", ["auth"]),
    isLoggedIn() {
      return this.auth.isLoggedIn;
    },
  },
  methods: {
    toggleDrawer() {
      this.$store.dispatch("toggleDrawer");
    },
    logOut() {
      this.$store.dispatch("user/logOut");
    },
  },
};
</script>
