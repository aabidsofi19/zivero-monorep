<script setup>
import { ref } from 'vue'
import BrandForm from './BrandForm.vue'
import BaseDialog from './BaseDialog.vue'
import BaseButton from './BaseButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { createBrand } from 'graphql-client/admin/collections'
import { getBrands } from 'graphql-client/queries/collections'
const { mutate: createBrandMutation, loading: creatingBrand, error: creatingBrandError } = useMutation(createBrand)

const isOpen = ref(false)

const input = ref({
  name: '',
  logo: '',
})

const save = () => {
  createBrandMutation(
    {
      input: input.value,
    },
    {
      update: (cache, { data: response }) => {
        const brand = response.createBrand.brand

        cache.updateQuery({ query: getBrands }, data => ({
          brands: [...data.brands, brand],
        }))
      },
    },
  )
}
</script>

<template>
  <base-button @click="isOpen = true"> Create Brand </base-button>
  <base-dialog title="create brand" v-model="isOpen">
    {{ creatingBrandError }}
    <brand-form v-model="input"></brand-form>
    <base-button @click="save" :loading="creatingBrand"> Save </base-button>
  </base-dialog>
</template>
