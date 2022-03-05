<script setup>
import { ref } from 'vue'
import BaseDialog from './BaseDialog.vue'
import BaseButton from './BaseButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { deleteVariant } from 'graphql-client/admin/collections'

import { getVariants } from 'graphql-client/queries/collections'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  variant: { type: Object },
})
const emit = defineEmits(['update:modelValue'])

const { loading, error, mutate } = useMutation(deleteVariant)

const Delete = () => {
  mutate(
    {
      id: props.variant.id,
    },
    {
      update: (cache, { data: { deleteVariant } }) => {
        const variant = deleteVariant.variant
        if (variant) {
          cache.updateQuery({ query: getVariants }, data => ({
            variants: data.variants.filter(varaint_ => varaint_.id !== variant.id),
          }))
        }

        emit('update:modelValue', false)
      },
    },
  )
}
</script>

<template>
  <base-dialog v-model="modelValue" title="Delete Variant">
    <p>Are you sure you want to delete Variant {{ variant.name }} : {{ variant.value }}</p>
    <p>You cant undo this action</p>

    <base-button @click="Delete" :loading="loading" danger> Delete </base-button>
  </base-dialog>
</template>
