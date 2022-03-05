<template>
  <Component
    :is="$props.tag"
    class="p-6 font-montserrat space-y-3 overflow-hidden break-words"
    :class="[$props.outlinedTop ? 'border-t' : 'border-t-none', `shadow-${$props.elevation}`]"
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
    outlinedTop: {
      type: Boolean,
      default: true,
    },

    elevation: {
      type: String,
      default: 'none',
      validator(value) {
        const shadows = ['shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl']

        return shadows.includes('shadow-value')
      },
    },
  },
}
</script>
