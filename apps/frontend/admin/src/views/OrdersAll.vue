<template>
  <div class="container mx-auto p-5">
    <!-- header -->
    <div class="flex justify-between my-4 items-center">
      <span class="text-lg font-semibold font-montserrat text-black">Orders</span>
      <!-- <div class="flex items-center text-gray-600">
        <span class="mx-2">Import</span>
        <span class="ml-2 mr-4">Export</span>
        <v-button @click="$router.push({ name: 'products-create' })"> Create Order </v-button>
      </div> -->
    </div>

    <orders-list></orders-list>
  </div>
</template>

<script>
import VButton from '../components/BaseButton.vue'

// import VCard from '../components/AppCard.vue'
import OrdersList from '../components/OrdersList.vue'

export default {
  components: { VButton, OrdersList },
}
</script>
