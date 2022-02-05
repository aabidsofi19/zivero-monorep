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
  primary: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <button
    class="text-center uppercase font-sans block py-2 px-5 rounded text-white transition-all ease-in-out duration-300 hover:scale-105"
    :class="{
      'bg-teal-700 hover:bg-teal-600': primary,
      'bg-gray-400 cursor-not-allowed': disabled,
      'bg-gray-400 cursor-wait': loading,
    }"
    v-bind="$attrs"
  >
    <div class="flex gap-2">
      <slot> </slot>
      <div
        v-if="loading"
        style="border-top-color: transparent"
        class="w-5 h-5 border-4 border-white border-solid rounded-full animate-spin"
      ></div>
    </div>
  </button>
</template>
