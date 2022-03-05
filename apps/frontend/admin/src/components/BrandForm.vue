<script setup>
import { ref, watchEffect } from 'vue'
import BaseInput from './BaseInput.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const input = ref({
  name: '',
  logo: '',
})

watchEffect(() => {
  input.value = props.modelValue
  emit('update:modelValue', input.value)
})
</script>

<template>
  <div class="py-3 space-y-3">
    <base-input placeholder="name" label="name" v-model="input.name"></base-input>
    <base-input placeholder="logo" label="logo" v-model="input.logo"></base-input>
  </div>
</template>
