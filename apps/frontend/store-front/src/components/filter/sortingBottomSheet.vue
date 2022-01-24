<template>
    <v-bottom-sheet v-model="isOpen">
        <sorting-options/>
    </v-bottom-sheet>
 
</template>

<script>
import { mapState,mapMutations } from "vuex"
import sortingOptions  from "./sortingOptions.vue";
 
  
  export default {
    components:{
      sortingOptions
    } ,

    computed:{
      ...mapState("filters",["isSortingSheetOpen"]),
      isOpen:{
        get(){
          return this.isSortingSheetOpen
        },
        set(value){
           this.toggleSortingSheet(value)
        }
      }
    },

    methods:{
      ...mapMutations("filters",["toggleSortingSheet"])
    }
  }
</script>