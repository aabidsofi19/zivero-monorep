<template>
  <Component
    :is="$props.tag"
    id="input"
    class="p-3 font-bold text-black text-lg"
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
      default: 'h1',
    },
    outlinedBottom: {
      type: Boolean,
      default: true,
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
