<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps(['title'])
const active = ref(false)
</script>
<template>
  <li>
    <div
      class="text-lg my-2 flex items-center justify-between w-full px-5 py-2 rounded-md hover:bg-slate-300"
      @click="active = !active"
    >
      <p class="text-lg text-gray-700 font-semibold">{{ $props.title }}</p>
      <font-awesome-icon icon="chevron-down" />
    </div>
    <div v-show="active" class="space-y-2 px-5">
      <slot />
    </div>
  </li>
</template>
