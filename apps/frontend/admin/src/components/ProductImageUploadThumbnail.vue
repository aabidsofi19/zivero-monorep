<script setup>
defineProps({
  src: {
    type: String,
    default: null,
  },
  alt: {
    type: String,
    default: null,
  },
})

defineEmits(['remove'])
</script>

<template>
  <div class="relative hover:bg-blend-overlay shadow rounded-md">
    <img :src="src" :alt="alt" class="border rounded-md border-gray-300" />
    <div class="h-full w-full bg-gray-800 absolute inset-0 opacity-0 hover:opacity-50 p-3">
      <font-awesome-icon icon="times" class="text-white float-right cursor-pointer" @click="$emit('remove')"
        >close</font-awesome-icon
      >
    </div>
  </div>
</template>
