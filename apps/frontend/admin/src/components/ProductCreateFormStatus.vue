<template>
  <v-card>
    <v-card-heading>Product Status</v-card-heading>
    <v-card-body>
      <div>
        <select id="product-status" name="Product Status" v-model="model" class="w-full border-gray-400 rounded">
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </v-card-body>
  </v-card>
</template>

<script>
import { VCardFooter, VCard, VCardHeading, VCardBody } from './AppCard.vue'
import VInput from './BaseInput.vue'

export default {
  components: {
    VCardFooter,
    VCardHeading,
    VCard,
    VCardBody,
    VInput,
  },
  props: {
    modelValue: {
      type: String,
      default: 'draft',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
</script>
