<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    :class="[
      active ? 'bg-mint bg-opacity-50 text-teal-800 border-l-8 border-teal-800 px-2' : 'px-3 text-gray-600',
      'rounded-r-sm font-medium py-1  cursor-pointer text-base',
    ]"
  >
    <slot></slot>
  </div>
</template>
