<script setup>
import { ref, watchEffect } from 'vue'
import BrandForm from './BrandForm.vue'
import BaseDialog from './BaseDialog.vue'
import BaseButton from './BaseButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { updateBrand } from 'graphql-client/admin/collections'
import { getBrands } from 'graphql-client/queries/collections'
const props = defineProps({
  brand: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const input = ref({
  name: '',
  logo: '',
})

const { mutate, loading, error } = useMutation(updateBrand)
const save = () => {
  mutate(
    {
      id: props.brand.id,
      input: input.value,
    },
    {
      update: (cache, { data: response }) => {
        const brand = response.updateBrand.brand
        if (brand) {
          cache.updateQuery({ query: getBrands }, data => ({
            brands: data.brands.map(brand_ => (brand_.id === brand.id ? brand : brand_)),
          }))
        }
      },
    },
  )
}

watchEffect(() => {
  input.value.name = props.brand.name
  input.value.logo = props.brand.logo
})
</script>

<template>
  <base-dialog title="update brand" v-model="modelValue">
    <brand-form v-model="input"></brand-form>
    <base-button @click="save" :loading="loading"> Save </base-button>
  </base-dialog>
</template>
