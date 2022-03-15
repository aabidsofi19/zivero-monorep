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
  selectedValue.value = props.value
}

const selected = computed(() => {
  if (selectedValue.value instanceof Array) {
    return props.value in selectedValue.value
  }

  return selectedValue.value == props.value
})

const checkbox = ref(true)
</script>

<template>
  <li class="flex justify-start items-center">
    <input type="checkbox" :checked="selected" class="mr-5" @input="selectItem" />
    <div><slot /></div>
  </li>
</template>
