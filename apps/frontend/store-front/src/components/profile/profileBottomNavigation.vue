<template>
<v-bottom-navigation
      fixed
      grow
      dark
     
      horizontal
      scroll-target="#scroll-threshold-example"
      scroll-threshold="500"
    >
      <v-btn @click="$router.push('/profile/account')">
        <span >Profile</span>

        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>

      <v-btn @click="$router.push('/profile/orders')" >
        <span>Orders</span>

        <v-icon>mdi-package-variant-closed</v-icon>
      </v-btn>

      <v-btn @click="$router.push('/profile/addresses')">
        <span>Addresses</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default{

}
</script>