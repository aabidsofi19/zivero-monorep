<script setup>
import { ListboxOption } from '@headlessui/vue'
import { computed } from 'vue'

defineProps(['value', 'label'])
</script>

<template>
  <ListboxOption v-slot="{ active, selected }" :value="{ value, label }" as="template">
    <li
      :class="[
        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
        'cursor-default select-none relative py-2 pl-10 pr-4',
      ]"
    >
      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
        <slot />
      </span>
      <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
        <font-awesome-icon icon="check" class="w-5 h-5" aria-hidden="true" />
      </span>
    </li>
  </ListboxOption>
</template>
