<template>
  <div id="demo">
    <button @click="show = !show">
      Toggle
    </button>

    <transition name="fade">
      <p
        v-if="show"
        class="bg-red-500 w-96 h-96"
      >
        hello
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },
}
</script>

<style lang="scss">
body {
  margin: 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
