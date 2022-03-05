<script setup>
import { watch } from 'vue'

import DropdownField from './ProductCreateOptionsDropdownField.vue'
import BaseMultiSelectField from './BaseMultiselectField.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ option: null, variants: [] }),
  },
  options: {
    type: Object,
    default: {},
  },
  validator: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

watch(props.modelValue, (oldVal, newVal) => {
  //console.log('watch', oldVal, newVal)

  if (oldVal.option !== newVal.option) {
    //console.log('opdating')

    const value = { ...props.modelValue, variants: [] }
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="space-y-5">
    <p class="text-base mt-2 text-black">Option Name</p>

    <dropdown-field v-model="modelValue.option" :options="Object.keys(options)"></dropdown-field>
    <div v-for="error of validator.option.$errors" :key="error.$uid" class="mt-1">
      <div class="text-red-600 italic text-sm">{{ error.$message }}</div>
    </div>
    <div class="space-y-3 z-0">
      <p class="text-base mt-2 text-black">Option Values</p>
      <base-multi-select-field
        v-model="modelValue.variants"
        :errors="validator.variants.$errors"
        :options="options[modelValue.option]"
      ></base-multi-select-field>
    </div>

    <!-- <button
      class="my-3 px-3 py-1 rounded font-thin text-black border border-gray-500 hover:bg-gray-100"
      @click="saveOption"
    >
      Done
    </button> -->
  </div>
</template>
