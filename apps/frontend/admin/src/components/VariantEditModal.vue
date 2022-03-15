<script setup>
import { ref, watchEffect } from 'vue'
import VariantForm from './VariantForm.vue'
import BaseDialog from './BaseDialog.vue'
import BaseButton from './BaseButton.vue'
import { useMutation } from '@vue/apollo-composable'
import { updateVariant } from 'graphql-client/admin/collections'
import { getVariants } from 'graphql-client/queries/collections'
const props = defineProps({
  variant: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const input = ref({
  name: '',
  value: '',
})

const { mutate, loading, error, onDone } = useMutation(updateVariant)

onDone(() => {
  if (error.value === null) {
    emit('update:modelValue', false)
  }
})

const save = () => {
  mutate(
    {
      id: props.variant.id,
      input: input.value,
    },

    // {
    //   update: (cache, { data: response }) => {
    //
    //     const variant = response.updateVariant.variant
    //     if (variant) {
    //       cache.updateQuery({ query: getVariants }, data => ({
    //         variants: data.variants.map(variant_ => (variant_.id === variant.id ? variant : variant_)),
    //       }))
    //     }
    //   },
    // },
  )
}

watchEffect(() => {
  input.value.name = props.variant.name
  input.value.value = props.variant.value
})
</script>

<template>
  <base-dialog title="update variant" v-model="modelValue">
    <variant-form v-model="input"></variant-form>
    <base-button @click="save" :loading="loading"> Save </base-button>
  </base-dialog>
</template>
