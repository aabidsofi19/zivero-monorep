<template>
  <div class="space-y-2">
    <label v-if="$props.label" :for="$attrs.id ?? 'input'">
      {{ $props.label }}
    </label>
    <input
      v-model="model"
      class="p-3 bg-white focus:outline-blue-400 w-full"
      :class="[
        $props.outlined ? 'border border-gray-400' : 'border-none',
        `shadow-${$props.elevation}`,

        $props.tile ? 'rounded-none' : `rounded-${$props.rounded}`,
      ]"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },

    outlined: {
      type: Boolean,
      default: true,
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
  emits: ['update:modelValue'],

  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>
