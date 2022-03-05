<script setup>
import BaseButton from './BaseButton.vue'
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <base-button
    base
    tile
    :class="[
      'mr-8 m-0 py-2.5 px-0 text-sm leading-5 font-medium text-gray-500  ',

      active ? 'border-b-4 border-green-800 font-bold text-black' : 'border-b-4 border-transparent',
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </base-button>
</template>
