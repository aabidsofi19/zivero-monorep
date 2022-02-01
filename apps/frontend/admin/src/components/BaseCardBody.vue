<template>
  <Component
    :is="$props.tag"
    class="p-3 space-y-3 overflow-hidden break-words"
    :class="[$props.outlinedBottom ? 'border-b' : 'border-b-none', `shadow-${$props.elevation}`]"
    v-bind="$attrs"
  >
    <slot />
  </Component>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'div',
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
  },
}
</script>
