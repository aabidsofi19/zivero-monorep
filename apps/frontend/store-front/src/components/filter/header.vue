<template>
 <div class="d-flex justify-space-between align-items-center px-3 ">
        <p class="text-h6 font-weight-bold pt-1 pr-3">FILTERS</p>
        <v-btn elevation="0" class="red--text my-0" @click="clearFilters()"
          >CLEAR ALL</v-btn
    >
       
    </div>
</template>

<script>
import {mapActions} from "vuex"

export default{
    methods:{
        ...mapActions("filters",["clearFilters"]),
    }
}
</script>