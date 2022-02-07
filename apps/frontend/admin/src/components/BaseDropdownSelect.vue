<template>
  <Listbox v-model="selectedItem">
    <div class="relative mt-1">
      <ListboxLabel>{{ label }} :</ListboxLabel>
      <ListboxButton
        class="relative border border-gray-400 focus-visible:border-blue-400 focus:ring-1 focus:ring-blue-600 w-full py-2 pl-3 pr-10 text-left bg-white rounded-md"
        :class="[$props.errors.length > 0 ? 'border-red-500' : 'border-gray-400']"
      >
        <span v-if="selectedItem" class="block truncate">{{ selectedItem.label }}</span>
        <span v-else class="block truncate text-gray-400">{{ placeholder }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <font-awesome-icon class="w-5 h-5 text-gray-400" icon="sort"></font-awesome-icon>
        </span>
      </ListboxButton>
      <!--errors-->
      <div v-for="error of $props.errors" :key="error.$uid" class="mt-1">
        <div class="text-red-600 italic text-sm">{{ error.$message }}</div>
      </div>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <slot />
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { ref } from 'vue'
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

// import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export { default as BaseDropdownOption } from './BaseDropdownOption.vue'

export const BaseDropdownSelect = {
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,

    // CheckIcon,
    // SelectorIcon,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'select',
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  computed: {
    selectedItem: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}

export default BaseDropdownSelect
</script>
