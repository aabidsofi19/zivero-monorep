<template>
  <div id="carousal">
    <v-carousel
      v-model="model"
      :continuous="false"
      :cycle="cycle"
      hide-delimiter-background
      height="auto"
      max-height="70vh"
    >
      <v-carousel-item v-for="img in images" :key="img" height="auto">
        <v-img
          height="auto"
          max-height="70vh"
          cover
          width="100%"
          src="https://cdn.shopify.com/s/files/1/0339/0901/files/graphic_tees_1600x.jpg?v=1642196932"
          alt="sale "
        >
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "welcome",
  components: {},
  props: ["images"],

  data: () => ({
    model: 0,
  }),
};
</script>
<style scoped lang="scss"></style>
