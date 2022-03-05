<script setup>
import { ref, watchEffect, computed, reactive } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { GetOrder, UpdateOrder } from 'graphql-client/admin/orders'
import { useRoute } from 'vue-router'

import OrderItems from '../components/OrderItems.vue'
import { VCard, VCardHeading, VCardBody } from '../components/AppCard.vue'
import VButton from '../components/BaseButton.vue'
const { params } = useRoute()

// const fulfillmentStatusOptions = ['UNFULFILLED', 'FULFILLED', 'PARTIALLYFULFILLED']
const fulfillmentStatusOptions = {
  UNFULFILLED: 'Unfulfilled',
  FULFILLED: 'Fulfilled',
  PARTIALLYFULFILLED: 'PartiallyFulfilled',
}

const { error, loading, result, onResult } = useQuery(GetOrder, {
  id: params.id,
  getCurrent: false,
})
const order = useResult(result, {}, data => data.order)
const customerUser = useResult(result, {}, data => data.order.customer.user)
const address = useResult(result, {}, data => data.order.address)
const fulfillmentStatus = useResult(result, 'INITIATED', data => data.order.fulfillmentStatus)
const subtotal = computed(() => {
  const items = order.value.orderitemSet
  if (items) {
    return items.reduce((acc, item) => acc + item.totalAmount, 0)
  }
  return 0
})

//update related code
const { error: updateError, loading: updateLoading, mutate: updateMutation } = useMutation(UpdateOrder)
const updateData = ref({
  fulfillmentStatus: fulfillmentStatus,
})
const saveUpdates = () => {
  const input = {
    id: order.value.id,
    fulfillmentStatus: updateData.value.fulfillmentStatus,
  }
  //console.log('input', input)
  updateMutation({ ...input })
}

watchEffect(() => {
  const value = fulfillmentStatusOptions[fulfillmentStatus.value]
  //console.log(value)
  if (value !== null || value !== undefined) {
    updateData.value = { ...updateData.value, fulfillmentStatus: value }
  }
})
</script>

<template>
  <div v-if="loading">loading</div>
  <div v-else-if="error">error {{ error }}</div>

  <div v-else class="container md:w-3/4 mx-auto py-3">
    <div class="py-3 flex w-full">
      <p class="text-lg font-bold text-black">#{{ order.id }}</p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="col-span-2 space-y-3">
        <order-items :items="order.orderitemSet"></order-items>

        <v-card elevation="md">
          <v-card-heading> Payment </v-card-heading>
          <v-card-body>
            <div class="flex justify-between">
              <p class="text-sm">Subtotal</p>
              <p class="text-sm">{{ subtotal }}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm">Tax</p>
              <p class="text-sm">{{ order.taxPercent }} %</p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm">Discount</p>
              <p class="text-sm">{{ order.discountPercent }} %</p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm">Shipping</p>
              <p class="text-sm">{{ order.shippingCharges }}</p>
            </div>

            <div class="flex justify-between">
              <p class="text-base font-semibold text-black">Total</p>
              <p class="text-base font-semibold text-black">{{ order.totalAmount }}</p>
            </div>
          </v-card-body>
        </v-card>

        <v-card>
          <v-card-heading>Shipping Details</v-card-heading>
          <v-card-body>
            <div class="space-x-4">
              <span class="text-lg font-semibold text-black">{{ address.name }}</span>
              <span class="border border-teal-800 px-3 py-1 rounded-full">
                {{ address.isHome ? 'home' : 'work' }}
              </span>
            </div>
            <p>
              {{ address.apartmentNo }} .{{ address.town }} . {{ address.city }} .{{ address.state }}.{{
                address.country
              }}
              {{ address.pincode }}
              -{{ address.email }}
            </p>
            <p class="font-semibold text-gray-600">{{ address.phoneNumber }}</p>
          </v-card-body>
        </v-card>
      </div>
      <div class="col-span-1 space-y-3">
        <v-card>
          <v-card-heading> Customer </v-card-heading>
          <v-card-body>
            <div class="flex justify-between">
              <p class="text-sm">Name</p>
              <p class="text-sm">{{ customerUser.username }}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm">Email</p>
              <p class="text-sm">{{ customerUser.email ?? 'not set' }}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm">User ID</p>
              <p class="text-sm">{{ customerUser.id }}</p>
            </div>
          </v-card-body>
        </v-card>
        <v-card>
          <v-card-heading> Fullfillment Status </v-card-heading>
          <v-card-body>
            <div>
              <select
                v-model="updateData.fulfillmentStatus"
                class="w-full"
                name="Fulfilment Status"
                id="fulfilment-status"
              >
                <option v-for="(value, key) in fulfillmentStatusOptions" :key="key" :value="value">{{ value }}</option>
              </select>
            </div>
          </v-card-body>
        </v-card>
        <v-card>
          <v-card-heading> Status </v-card-heading>
          <v-card-body>
            <div class="flex justify-between">
              <p class="text-sm">Created</p>
              <p class="text-sm">{{ order.createdAt.split('T')[0] }}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm">Updated</p>
              <p class="text-sm">{{ order.updatedAt.split('T')[0] }}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm">Payment Status</p>
              <p class="text-sm">{{ order.paymentStatus }}</p>
            </div>
          </v-card-body>
        </v-card>
      </div>
    </div>

    <!-- Action Buttons-->
    <div class="flex justify-between items-center border-t mt-3 py-4">
      <div class="flex gap-2">
        <v-button danger> Remove Order </v-button>
      </div>

      <v-button @click="saveUpdates" :loading="updateLoading" :disabled="updateLoading"> Save </v-button>
    </div>
  </div>
</template>
