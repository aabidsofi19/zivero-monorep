<template>
  <div>
    <div id="carousel" class="d-md-none">
      <v-carousel light cycle class="" height="auto" hide-delimiter-background>
        <v-carousel-item class="" v-for="(image, index) in images" :key="index">
          <v-img
            :src="image"
            contain
            height="auto"
            width="100%"
            class="mb-6"
            max-height="600px"
          >
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </div>

    <div class="d-none d-md-flex flex-wrap">
      <v-img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        contain
        height="auto"
        width="48%"
        class="ma-2 flex-grow-0"
      >
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "productCarousal",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="css" scoped>
#carousel {
  background-color: white;
  height: auto;
  width: 100vw;
}
</style>
