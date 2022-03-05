<template>
  <homepageLoading v-if="$apollo.loading" />

  <v-app id="home-page" v-else>
    <offer />
    <banner
      :imgSrc="'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'"
    />

    <categories
      :genders="filters.genders"
      :categories="filters.categories"
      class="pl-md-16"
    />

    <carousal :images="images"> </carousal>

    <brands :brands="filters.brands" class="pl-md-16" />

    <div class="pl-md-16 my-5">
      <p class="text-h4 font-weight-bold pl-2 py-4">New Arrival</p>
      <productsGrid :productChunks="newArrivals"></productsGrid>
    </div>

    <!-- <v-container>
             <p class="text-h4 pl-2 py-4"> Trending Now  </p>
             <productsGrid :productChunks="productChunks"></productsGrid> 
             
        </v-container>

        <v-container>
             <p class="text-h4 pl-2 py-4"> Femine fashion you wont miss   </p>
             <productsGrid :productChunks="productChunks"></productsGrid> 
             
        </v-container> -->
  </v-app>
</template>

<script>
//import navbar from './navbar.vue';
import banner from "./home/banner.vue";
import categories from "./home/categoriesscroller.vue";
import brands from "./home/brands.vue";
import productsGrid from "./products/productsGrid.vue";
import carousal from "./carousal.vue";
import offer from "./offer.vue";
import { LoadMainData } from "../graphql/Queries/homePage";
import { chunk } from "lodash";
import homepageLoading from "./home/loading.vue";
//let h = document.getElementById('nav').clientHeight;

export default {
  name: "homePage",
  components: {
    homepageLoading,
    banner,
    categories,
    brands,
    productsGrid,
    carousal,
    offer,
  },
  mounted() {
    // this.$store.dispatch("products/getProducts");
  },

  data: () => ({
    model: null,
    images: [
      "https://images.unsplash.com/photo-1542062700-9b61ccbc1696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3R5bGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcXw2V1eFXEmzty43HMDJhuFVclDdybrcbGw&usqp=CAUh",
    ],
  }),

  computed: {
    womensTrendingProducts() {
      return chunk(this.WomensTrending.products, 4);
    },
    newArrivals() {
      //console.log("chunks");
      return chunk(this.NewArrivals.products, 4);
    },
  },
  apollo: {
    filters: { query: LoadMainData },
    categories: { query: LoadMainData },
    MensTrending: { query: LoadMainData },
    WomenTrending: { query: LoadMainData },
    NewArrivals: { query: LoadMainData },
  },
};
</script>

<style scoped lang="css">
#home-page {
  background-color: #fdf8f5;
}
#cat {
  margin-top: 0%;
}
</style>
