<template>
<v-overlay width="100%" height="100%" v-if="loading">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>


<script>
export default {
    props:{
        loading:{
            type:Boolean,
            default:false,
        }
    }
}
</script>