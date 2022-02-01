<script setup>
import { computed, watch } from 'vue'
import DropdownField from './ProductCreateOptionsDropdownField.vue'
import BaseMultiSelectField from './BaseMultiselectField.vue'
const props = defineProps({
  modelValue: {
    type: Object,
    default: { option: '', variants: [] },
  },
  options: {
    type: Object,
    default: {},
  },
})
const emit = defineEmits(['update:modelValue'])

// const selectedOption = computed({
//   get: () => props.modelValue,
//   set: value => {
//     emit('update:modelValue', value)
//   },
// })

watch(props.modelValue, (oldVal, newVal) => {
  console.log('watch', oldVal, newVal)

  if (oldVal.option != newVal.option) {
    console.log('opdating')

    let value = { ...props.modelValue, variants: [] }
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="space-y-5">
    <p class="text-base mt-2 text-black">Option Name</p>
    <dropdown-field :options="Object.keys(options)" v-model="modelValue.option"></dropdown-field>

    <div class="space-y-3 z-0">
      <p class="text-base mt-2 text-black">Option Values</p>
      <base-multi-select-field
        :options="options[modelValue.option]"
        v-model="modelValue.variants"
      ></base-multi-select-field>
    </div>
  </div>
</template>
