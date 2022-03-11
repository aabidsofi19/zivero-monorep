<template>
  <div>
    <CoolLightBox :items="lightBoxImages" :index="index" @close="index = null">
    </CoolLightBox>

    <div id="carousel" class="d-md-none">
      <v-carousel light cycle class="" height="auto" hide-delimiter-background>
        <v-carousel-item class="" v-for="(image, i) in images" :key="i">
          <v-img
            :src="image"
            contain
            height="auto"
            width="100%"
            class="mb-6"
            max-height="600px"
            @click="index = i"
          >
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </div>

    <div class="d-none d-md-flex flex-wrap">
      <v-img
        v-for="(image, i) in images"
        :key="i"
        :src="image"
        contain
        @click="index = i"
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
      type: Set,
      required: true,
    },
  },
  data() {
    return {
      index: null,
    };
  },

  computed: {
    lightBoxImages() {
      let sizeOptions =
        "?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=835";
      return [...this.images].map((imageUrl) => imageUrl + sizeOptions);
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
