<script setup>
import { ref, computed } from 'vue'
import baseButtonModal from './BaseButtonModal.vue'
import baseInput from './BaseInput.vue'
import baseButton from './BaseButton.vue'
import multiSelect from './BaseMultiselectField.vue'
import { getBrands } from 'graphql-client/queries/collections'
import { createCategory } from 'graphql-client/admin/collections'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'

const { loading, error, result } = useQuery(getBrands)
const brands = useResult(result, [], data => data.brands)

const brandNames = computed(() => brands.value.map(brand => brand.name))
const genders = ['Men', 'Women']
const {
  mutate: categoryMutation,
  loading: creatingCategory,
  error: creatingCategoryError,
} = useMutation(createCategory)

const input = ref({
  name: '',
  description: '',
  brands: [],
  genders: [],
  image: '',
})

defineEmits(['close'])

const saveCategory = () => {
  let input_copy = { ...input.value }
  input_copy.brands = input_copy.brands.map(name => brands.value.find(brand => brand.name == name).id)
  console.log(input_copy)
  categoryMutation({
    input: input_copy,
  })
}
</script>

<template>
  <base-button-modal button-text="add category" title="add categorry">
    <div class="py-3">
      {{ input }}
      {{ brandNames }}
      <base-input placeholder="name" v-model="input.name"></base-input>

      <textarea class="w-full rounded mt-3" v-model="input.description" placeholder="description"></textarea>
      <multi-select v-model="input.brands" :options="brandNames"></multi-select>
      <multi-select v-model="input.genders" :options="genders"> </multi-select>
      <base-input placeholder="image url" v-model="input.image"></base-input>
      <base-button @click="saveCategory" class="w-full" :loading="creatingCategory" :disabled="creatingCategory"
        >Save</base-button
      >
    </div>
  </base-button-modal>
</template>
