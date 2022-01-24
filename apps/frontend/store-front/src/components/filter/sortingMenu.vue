<template>
  <div class="text-center">
    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined color="black"
          dark
          v-bind="attrs"
          v-on="on"
          
        >
          Sort By : {{filterInput.sortBy}}
          <span>
              <v-icon>
                  mdi-chevron-down
              </v-icon>
          </span>
        </v-btn>
      </template>
      
      <sorting-options ></sorting-options>
    </v-menu>
  </div>
</template>


<script>
  import sortingOptions  from "./sortingOptions.vue";
  import { mapState } from "vuex";
  export default{
    components:{
      sortingOptions
    },
    computed:{
      ...mapState("filters",["filterInput"])
    }
  }
</script>
