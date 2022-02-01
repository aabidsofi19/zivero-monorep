<script setup>
import { FontAwesomeIcon as fIcon } from '@fortawesome/vue-fontawesome'
import useNavdrawer from '../composables/useNavdrawer'

const { toggleDrawer } = useNavdrawer()
</script>

<template>
  <!-- start navbar -->
  <div
    class="fixed w-screen z-10 md:relative flex flex-row flex-wrap items-center justify-between bg-white p-3 border-b border-gray-300"
  >
    <!-- logo -->
    <div class="w-56 flex flex-row items-center">
      <button
        class="mr-4 text-right text-gray-900 md:hidden"
        @click="toggleDrawer()"
      >
        <f-icon icon="bars"></f-icon>
      </button>
      <!-- <img src="img/logo.png" class="w-10 flex-none" /> -->
      <strong class="capitalize ml-1 flex-1">zivero</strong>
    </div>
  </div>
</template>

<style scoped lang="sass">
.nav-icon-link
  @apply mr-2 transition duration-500 ease-in-out hover:text-gray-900
</style>
