<template>
  <with-side-bar>
    <div class="container h-full p-5">
      <router-view></router-view>
    </div>
  </with-side-bar>
</template>

<script>
import WithSideBar from '../layouts/WithSideBar.vue'

export default {
  components: { WithSideBar },
}
</script>
