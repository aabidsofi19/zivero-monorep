<script setup>
import { inject, computed, ref } from 'vue'

const selectedValue = inject('selected', 'hello')
const props = defineProps({
  tag: {
    type: String,
    default: 'li',
  },
  value: {
    type: String,
    default: '',
  },
  prependIcon: {
    type: String,
    default: 'chevron',
  },
})

const selectItem = () => {
  console.log('emitting')
  selectedValue.value = props.value
}

const selected = computed(() => {
  if (selectedValue.value instanceof Array) {
    return props.value in selectedValue.value
  } else {
    return selectedValue.value == props.value
  }
})

const checkbox = ref(true)
</script>

<template>
  <li class="flex justify-start items-center">
    <input type="checkbox" :checked="selected" @input="selectItem" class="mr-5" />
    <div><slot /></div>
  </li>
</template>
