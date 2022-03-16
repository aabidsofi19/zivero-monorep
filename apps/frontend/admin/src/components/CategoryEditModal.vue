<script setup>
import { ref, computed, watchEffect } from 'vue'
import CategoryForm from './CategoryForm.vue'
import baseButtonModal from './BaseButtonModal.vue'
import baseButton from './BaseButton.vue'
import { getBrands } from 'graphql-client/queries/collections'
import { updateCategory } from 'graphql-client/admin/collections'

import { useQuery, useResult, useMutation } from '@vue/apollo-composable'

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const { loading, error, result } = useQuery(getBrands)
const brands = useResult(result, [], data => data.brands)
const brandNames = computed(() => brands.value.map(brand => brand.name))
const genders = ['Men', 'Women']
const {
  mutate: categoryMutation,
  loading: updatingCategory,
  error: updatingCategoryError,
} = useMutation(updateCategory)

const input = ref({
  name: '',
  description: '',
  brands: [],
  genders: [],
  image: '',
})

watchEffect(() => {
  if (props.category !== null) {
    const category = props.category
    input.value.name = category.name
    input.value.description = category.description
    input.value.image = category.image
    input.value.brands = category.brands.map(brand => brand.name)
    input.value.genders = category.genders
  }
})

defineEmits(['close'])

const saveCategory = () => {
  let input_copy = Object.assign({}, input.value)
  input_copy.brands = input_copy.brands.map(name => brands.value.find(brand => brand.name == name).id)

  categoryMutation({
    id: props.category.id,
    input: input_copy,
  })
}
</script>

<template>
  <base-button-modal button-text="edit" title="edit categorry">
    <div class="py-3 space-y-3">
      {{ updatingCategoryError }}
      <category-form v-model="input"></category-form>
      <base-button @click="saveCategory" class="w-full" :loading="updatingCategory" :disabled="updatingCategory"
        >Save</base-button
      >
    </div>
  </base-button-modal>
</template>
