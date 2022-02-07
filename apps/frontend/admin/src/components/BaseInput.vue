<template>
  <div class="space-y-2">
    <label v-if="$props.label" :for="$attrs.id ?? 'input'">
      {{ $props.label }}
    </label>
    <input
      v-model="model"
      class="p-2 bg-white focus:outline-blue-400 w-full"
      :class="[
        $props.outlined ? 'border border-gray-400' : 'border-none',
        `shadow-${$props.elevation}`,

        $props.tile ? 'rounded-none' : `rounded-${$props.rounded}`,

        $props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text',

        $props.errors.length > 0 ? 'border-red-500' : 'border-gray-400',
      ]"
      v-bind="$attrs"
    />

    <div v-for="error of $props.errors" :key="error.$uid" class="mt-1">
      <div class="text-red-600 italic text-sm">{{ error.$message }}</div>
    </div>
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

    errors: {
      type: Array,
      default: () => [],
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
