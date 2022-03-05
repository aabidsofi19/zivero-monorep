<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  base: {
    type: Boolean,
    default: false,
  },

  primary: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  warning: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Boolean,
    default: false,
  },
  danger: {
    type: Boolean,
    default: false,
  },
  tile: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    class="text-center capitalize font-montserrat block py-2 px-5 transition-all ease-in-out duration-300 hover:scale-105"
    :class="{
      rounded: !tile,
      'bg-teal-700 hover:bg-teal-600 text-white ': !secondary && !warning && !success && !info && !danger && !base,
      'bg-mint text-gray-600  ': secondary,
      'bg-yellow-600 text-white': warning,
      'bg-green-600 text-gray-600': success,
      'bg-blue-600 text-gray-600': info,
      'bg-white hover:shadow-sm border border-red-500 text-red-500': danger,
      'bg-gray-400 cursor-not-allowed': disabled,
      'bg-gray-400 cursor-wait': loading,
      'bg-white': base,
    }"
    v-bind="$attrs"
  >
    <div class="flex justify-center gap-2">
      <slot> </slot>
      <div
        v-if="loading"
        style="border-top-color: transparent"
        class="w-5 h-5 border-4 border-white border-solid rounded-full animate-spin"
      ></div>
    </div>
  </button>
</template>
