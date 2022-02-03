<template>
  <v-card>
    <v-card-heading> Product Organisation </v-card-heading>
    <v-card-body>
      <base-dropdown-select v-model="model['gender']" label="Select Gender" :errors="v$.model.gender.$errors">
        <base-dropdown-option v-for="gender in options.genders" :key="gender" :label="gender" :value="gender">
          {{ gender }}
        </base-dropdown-option>
      </base-dropdown-select>

      <base-dropdown-select v-model="model['category']" label="Select Category" :errors="v$.model.category.$errors">
        <base-dropdown-option
          v-for="category in options.categories"
          :key="category.id"
          :label="category.name"
          :value="category.id"
        >
          {{ category.name }}
        </base-dropdown-option>
      </base-dropdown-select>
      <base-dropdown-select v-model="model['brand']" label="Select Brand" :errors="v$.model.brand.$errors">
        <base-dropdown-option v-for="brand in options.brands" :key="brand.id" :label="brand.name" :value="brand.id">
          {{ brand.name }}
        </base-dropdown-option>
      </base-dropdown-select>
    </v-card-body>
  </v-card>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, integer, minValue } from '@vuelidate/validators'
import { VCardBody, VCard, VCardHeading } from './AppCard.vue'

import { BaseDropdownOption, BaseDropdownSelect } from './BaseDropdownSelect.vue'

export default {
  components: {
    VCardHeading,
    VCardBody,
    VCard,
    BaseDropdownOption,
    BaseDropdownSelect,
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      model: {
        gender: { required },
        category: { required },
        brand: { required },
      },
    }
  },
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.emit('update:modelValue', value)
      },
    },
  },
}
</script>
