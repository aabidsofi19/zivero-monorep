<script setup>
import BaseDialog from './BaseDialog.vue'
import VButton from './BaseButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { deleteCategory } from 'graphql-client/admin/collections'
import { getCategories } from 'graphql-client/queries/collections'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  category: { type: Object },
})
const emit = defineEmits(['update:modelValue'])

const { loading, error, mutate: deleteCategoryMutation } = useMutation(deleteCategory)

const Delete = () => {
  deleteCategoryMutation(
    {
      id: props.category.id,
    },
    {
      update: (cache, { data: { deleteCategory } }) => {
        if (deleteCategory.success) {
          cache.updateQuery({ query: getCategories }, data => ({
            categories: data.categories.filter(category => category.id !== props.category.id),
          }))
        }

        emit('update:modelValue', false)
      },
    },
  )
}
</script>

<template>
  <base-dialog v-model="modelValue" title="Delete category">
    {{ error }}
    <p>Are you sure you want to delete category {{ category.name }}</p>
    <p>You cant undo this action</p>

    <v-button @click="Delete" :loading="loading" danger> Delete </v-button>
  </base-dialog>
</template>
