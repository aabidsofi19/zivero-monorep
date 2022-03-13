<template>
  <div
    class="bg-white"
    :class="[outlined ? 'border' : 'border-none', `shadow-${elevation}`, tile ? 'rounded-none' : `rounded-${rounded}`]"
  >
    <slot></slot>
  </div>
</template>

<script>
import BaseCardHeadingVue from './BaseCardHeading.vue'
import BaseCardBodyVue from './BaseCardBody.vue'

export { default as VCardFooter } from './BaseCardFooter.vue'
export { BaseCardBodyVue as VCardBody, BaseCardHeadingVue as VCardHeading }

export const VCard = {
  name: 'VCard',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: 'md',
      validator(value) {
        const shadows = ['rounded-none', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl']

        return shadows.includes(`rounded-${value}`)
      },
    },

    elevation: {
      type: String,
      default: 'none',
      validator(value) {
        const shadows = ['shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl']

        return shadows.includes(`shadow-${value}`)
      },
    },

    tile: {
      type: Boolean,
      default: false,
    },
  },
}

export default VCard
</script>
