<template>
  <Component
    :is="$props.tag"
    class="space-y-3 overflow-hidden break-words"
    :class="[$props.outlinedBottom ? 'border' : 'border-none', `shadow-${$props.elevation}`]"
    v-bind="$attrs"
  >
    <base-expandable-item :title="title"> <slot /> </base-expandable-item>
  </Component>
</template>

<script>
import { computed, provide } from 'vue'
import BaseExpandableItem from './BaseExpandableItem'

export { default as BaseListItem } from './BaseListItem.vue'
export const BaseList = {
  inheritAttrs: false,
  components: { BaseExpandableItem },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'ul',
    },
    outlinedBottom: {
      type: Boolean,
      default: false,
    },

    elevation: {
      type: String,
      default: 'none',
      validator(value) {
        const shadows = ['shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl']

        return shadows.includes(`shadow-${value}`)
      },
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const selected = computed({
      get: () => props.modelValue,
      set: value => {
        const newValue = props.multiselect ? [...props.modelValue, value] : value
        context.emit('update:modelValue', newValue)
      },
    })

    provide('selected', selected)

    return {
      selected,
    }
  },
}

export default BaseList
</script>
