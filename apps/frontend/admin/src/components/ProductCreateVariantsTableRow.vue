<script setup>
import { reactive, computed, onUnmounted } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, integer, minValue } from '@vuelidate/validators'
import VInput from './BaseInput.vue'
import useVariantsValidator from '../composables/useVariantsValidator'

const props = defineProps({
  variants: {
    type: Array,
    required: true,
  },
  variantIds: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => {},
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'remove:modelValue'])

const variationData = computed({
  get: () => {
    if (props.modelValue == null || props.modelValue === undefined) {
      return {
        price: null,
        quantity: null,
        variant: props.variantIds,
      }
    }

    return props.modelValue
  },
})

const variantLabel = computed(() => {
  if (props.variants instanceof Array) {
    let label = props.variants.map(variant => Object.values(variant)[0])
    label = label.reduce((x, y) => `${x} / ${y}`)

    return label
  }

  return Object.values(props.variants)[0]
})

onUnmounted(() => {
  emit('remove:modelValue', null)
})

const setModel = (key, value) => {
  emit('update:modelValue', { ...variationData.value, [key]: value })
}

// validators
const rules = {
  price: { required, integer, minValue: 100 },
  quantity: { required, integer, minValue: 1 },
}
const { addValidator } = useVariantsValidator()
const v$ = useVuelidate(rules, variationData)
addValidator(v$)
console.log(v$)
</script>

<template>
  <tr>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex items-center">
        <div class="ml-3">
          <p class="text-gray-900 whitespace-no-wrap" @click="v$.$validate()">
            {{ variantLabel }}
          </p>
        </div>
      </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" valign="top">
      <div>
        <v-input
          :value="variationData['price']"
          placeholder="$ 100"
          type="number"
          :errors="v$.price.$errors"
          @input="setModel('price', $event.target.value)"
        />
      </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" valign="top">
      <v-input :value="0"></v-input>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" valign="top">
      <v-input
        :value="variationData['quantity']"
        type="number"
        :errors="v$.quantity.$errors"
        @input="setModel('quantity', $event.target.value)"
      ></v-input>
    </td>
    <!-- <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex border border-gray-400 rounded-md text-gray-600">
        <button class="py-2 border-r px-5 border-gray-400 hover:bg-gray-200">Edit</button>
        <button class="py-2 px-5 hover:bg-gray-200">Delete</button>
      </div>
    </td> -->
  </tr>
</template>
