<script setup>
defineProps({
  error: {
    type: Boolean,
    default: false,
  },
  warning: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  base: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div
    :class="{
      'bg-green-100 text-green-800': success,
      'bg-red-200 text-red-800': error,
      'bg-yellow-100 text-yellow-600': warning,
      'bg-gray-100 text-gray-600': disabled,
      'bg-blue-100 text-blue-800': info,
      'px-3 inline-flex text-xs leading-5 font-semibold rounded-full text-center': base,
    }"
  >
    <slot></slot>
  </div>
</template>
