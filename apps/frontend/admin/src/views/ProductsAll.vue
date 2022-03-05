<template>
  <div class="container min-h-screen h-full p-5">
    <!-- header -->
    <div class="flex justify-between my-4 items-center">
      <span class="text-lg font-bold text-black">Products</span>
      <div class="flex items-center">
        <span class="mx-2">Import</span>
        <span class="ml-2 mr-4">Export</span>
        <v-button @click="$router.push({ name: 'products-create' })"> Add Product </v-button>
      </div>
    </div>

    <products-list></products-list>

    <!-- <div class="flex">
      <v-button v-for="i in result.totalPages" :key="i">{{ i }}</v-button>
    </div> -->
  </div>
</template>

<script>
import { ref } from 'vue'

// import WithSideBar from '../layouts/WithSideBar.vue'
import VButton from '../components/BaseButton.vue'

// import VCard from '../components/AppCard.vue'
import ProductsList from '../components/ProductsList.vue'

export default {
  components: { VButton, ProductsList },
}
</script>
