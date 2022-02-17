<script setup>
import { computed } from 'vue'
import VInput from './BaseInput.vue'
const props = defineProps({
  orderItem: {
    type: Object,
    required: true,
  },
})

const product = computed(() => props.orderItem.product)
</script>

<template>
  <tr>
    <td class="px-6 py-4 w-full whitespace-nowrap flex justify-start items-center gap-2">
      <div class="h-12 w-12 rounded bg-gray-600">
        <img :src="product.images ? product.images[0] : ''" alt="" />
      </div>
      <div>
        <router-link :to="{ name: 'product-edit', params: { id: product.id } }">{{ product.name }}</router-link>
        <div class="text-subtitle-2 text-capitalize">
          <span class="mr-2 text-sm" v-for="variant of orderItem.variation.variant" :key="variant.name">
            {{ variant.name }}: <span class="text-uppercase">{{ variant.value }}</span>
          </span>
        </div>
        <p>{{ orderItem.amount }}</p>
      </div>
    </td>
    <td class="px-6 w-28 py-4 whitespace-nowrap">
      <p>{{ orderItem.quantity }}</p>
    </td>

    <td class="px-6 py-4 whitespace-nowrap">{{ orderItem.totalAmount }}</td>
    <td class="px-6 py-4 whitespace-nowrap">
      <font-awesome-icon icon="times"></font-awesome-icon>
    </td>
  </tr>
</template>
