<template>
    <div id="carousel" >
        <v-carousel light cycle class="" height="auto"  hide-delimiter-background >
            <v-carousel-item   
                class=""            
                v-for="(image, index) in productImages"
                :key="index"
            >
               <v-img :src="image" contain height="auto" width="100%" class="mb-6"  max-height="600px"> </v-img>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>


<script>
import {mapGetters} from "vuex" ;
export default {
    name: "productCarousal",

    computed: {
        ...mapGetters("products",["productImages"])
    },


}
</script>

<style lang="css" scoped>
#carousel{
    background-color: white;
    height: auto;
    width: 100vw;
    max-width: 700px;
}
</style>