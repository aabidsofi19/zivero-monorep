<script setup>
import { ref } from 'vue'
import BaseDialog from './BaseDialog.vue'
import BaseButton from './BaseButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { deleteBrand } from 'graphql-client/admin/collections'

import { getBrands } from 'graphql-client/queries/collections'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  brand: { type: Object },
})
const emit = defineEmits(['update:modelValue'])

const { loading, error, mutate: deleteBrandMutation } = useMutation(deleteBrand)

const Delete = () => {
  deleteBrandMutation(
    {
      id: props.brand.id,
    },
    {
      update: (cache, { data: { deleteBrand } }) => {
        const brand = deleteBrand.brand
        if (brand) {
          cache.updateQuery({ query: getBrands }, data => ({
            brands: data.brands.filter(brand_ => brand_.id !== brand.id),
          }))
        }

        emit('update:modelValue', false)
      },
    },
  )
}
</script>

<template>
  <base-dialog v-model="modelValue" title="Delete Brand">
    <p>Are you sure you want to delete Brand {{ brand.name }}</p>
    <p>You cant undo this action</p>

    <base-button @click="Delete" :loading="loading" danger> Delete </base-button>
  </base-dialog>
</template>
