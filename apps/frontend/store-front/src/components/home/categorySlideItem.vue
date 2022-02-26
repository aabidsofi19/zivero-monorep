<template>
  <v-slide-item>
    <div class="ma-2">
      <v-card color="grey lighten-2" class="my-3 pa-0" elevation="0" outlined>
        <v-img
          :src="'https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_533,b_rgb:f5f5f5/cms/RKWji6UFUgqcycaZ4dKlR/51810b36c76ba489106bb790cdeab4dc/TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER.png'"
          contain
          width="280px"
          height="280px"
        >
        </v-img>

        <div
          class="poppins white py-5 px-2 text-uppercase font-weight-bold text-subtitle"
        >
          {{ category.name }}
        </div>
      </v-card>
    </div>
  </v-slide-item>
</template>

<script>
export default {
  name: "categorySlideItem",
  props: ["category"],
};
</script>

<style scoped>
.item {
  cursor: pointer;
}
.name {
  text-align: center;
  margin: auto;
  color: black;
  text-transform: capitalize;
}
</style>
