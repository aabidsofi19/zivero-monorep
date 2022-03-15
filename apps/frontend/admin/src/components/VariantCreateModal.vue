<script setup>
import { ref } from 'vue'
import VariantForm from './VariantForm.vue'
import BaseDialog from './BaseDialog.vue'
import BaseButton from './BaseButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { createVariant } from 'graphql-client/admin/collections'
import { getVariants } from 'graphql-client/queries/collections'
const {
  mutate: createVariantMutation,
  loading: creatingVariant,
  error: creatingVariantError,
} = useMutation(createVariant)

const isOpen = ref(false)

const input = ref({
  name: '',
  value: '',
})

const save = () => {
  createVariantMutation(
    {
      input: input.value,
    },
    {
      update: (cache, { data: response }) => {
        const variant = response.createVariant.variant

        cache.updateQuery({ query: getVariants }, data => ({
          variants: [...data.variants, variant],
        }))

        isOpen.value = false
      },
    },
  )
}
</script>

<template>
  <base-button @click="isOpen = true"> Add Variant </base-button>
  <base-dialog title="create variant" v-model="isOpen">
    <variant-form v-model="input"></variant-form>
    <base-button @click="save" :loading="creatingVariant"> Save </base-button>
  </base-dialog>
</template>
