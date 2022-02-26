<template>
  <div>
    <p class="text-h4 font-weight-bold pl-2 py-4">Popular Categories</p>

    <v-slide-group v-model="model" class="pa-2" center-active>
      <!-- {{categories}} -->
      <!-- <gender-slide-item :gender="gender" v-for="gender in genders" :key="gender" @click.native="addGenderFilter(gender.name)" /> -->

      <categorySlideItem
        :category="category"
        v-for="category in categories"
        :key="category.name"
        @click.native="addCategoryFilter(category)"
      />
    </v-slide-group>
  </div>
</template>

<script>
import categorySlideItem from "./categorySlideItem.vue";
import { mapActions } from "vuex";
export default {
  name: "categories",
  components: {
    categorySlideItem,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },

    genders: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      model: null,
    };
  },
  methods: {
    ...mapActions("filters", ["selectFilter"]),

    addCategoryFilter(category) {
      console.log("adding temp filter");
      let filter = {
        categories: [category.id],
      };
      // this.selectFilter({filterType:"categories",value:[category.id],doUpdate:true})
      this.$router.push({
        name: "products",
        query: {
          filter: JSON.stringify(filter),
        },
      });
    },
    // addGenderFilter(genderName){
    //     console.log("adding temp filter") ;
    //     this.updateQueryFilters({
    //         genders:[genderName]
    //     })
    //      this.$router.push({"name":"products"})
    // },
  },
};
</script>
