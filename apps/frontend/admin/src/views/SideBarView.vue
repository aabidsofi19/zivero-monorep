<template>
  <with-side-bar>
    <div class="w-full min-h-screen h-full py-12">
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
