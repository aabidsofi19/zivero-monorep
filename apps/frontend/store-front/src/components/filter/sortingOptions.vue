<template>
    <v-list >
        <v-list-item-group v-model="sortOption">
        <v-list-item
          v-for="(item, index) in sortingOptions"
          :key="index" 
          :value="item.value"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        </v-list-item-group>
    </v-list>
</template>


<script>
  import { mapState,mapActions, mapMutations } from "vuex"
  export default {
    data: () => ({
    //   sortOption:"Popularity",
      
    }),
    computed :{
        ...mapState("filters",["sortingOptions","filterInput"]),
        sortOption:{
            get(){
                return  this.filterInput.sortBy
            },
            set(value){
                let payload={
                    filterType:"sortBy",
                    value:value,
                    doUpdate:false

                }
                this.selectFilter(payload)
                this.toggleSortingSheet(false)
            }

        }
    },
    methods:{
        ...mapActions("filters",["selectFilter"]),
        ...mapMutations("filters",["toggleSortingSheet"])
    }

  }
</script>
