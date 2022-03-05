<script setup>
import { ref, computed, watchEffect } from 'vue'
import baseButtonModal from './BaseButtonModal.vue'
import baseInput from './BaseInput.vue'
import baseButton from './BaseButton.vue'
import multiSelect from './BaseMultiselectField.vue'
import { getBrands } from 'graphql-client/queries/collections'
import { createCategory } from 'graphql-client/admin/collections'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'

const props = defineProps({
  modelValue: { type: Object },
})

const emit = defineEmits(['update:modelValue'])

const { loading, error, result } = useQuery(getBrands)
const brands = useResult(result, [], data => data.brands)
const brandNames = computed(() => brands.value.map(brand => brand.name))
const genders = ['Men', 'Women']

const input = ref({
  name: '',
  description: '',
  brands: [],
  genders: [],
  image: '',
})

watchEffect(() => {
  input.value = props.modelValue
  emit('update:modelValue', input.value)
})
</script>

<template>
  <div>
    <div class="py-3 space-y-3">
      <base-input placeholder="name" label="name" v-model="input.name"></base-input>

      <div>
        <label class="" for="description"> Description </label>
        <textarea class="w-full rounded" v-model="input.description" placeholder="description"></textarea>
      </div>
      <multi-select
        label="brands"
        placeholder="select brands"
        v-model="input.brands"
        :options="brandNames"
      ></multi-select>
      <multi-select label="genders" placeholder="select genders" v-model="input.genders" :options="genders">
      </multi-select>
      <base-input label="image url " class="" placeholder="image url" v-model="input.image"></base-input>
    </div>
  </div>
</template>
