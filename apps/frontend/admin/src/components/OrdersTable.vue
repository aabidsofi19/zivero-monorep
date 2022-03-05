<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>

                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fullfillment Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <!-- <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th> -->
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="{ node: order } in orders" :key="order.id" class="cursor-pointer" @click="goToOrder(order.id)">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-600 font-semibold font-montserrat">#{{ order.id }}</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ order.createdAt.split('T')[0] }}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ order.customer.user.username }}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="px-3 inline-flex text-xs leading-5 font-semibold rounded-full text-center"
                    :class="{
                      'bg-green-100 text-green-800': order.paymentStatus === 'SUCCEEDED',
                      'bg-red-200 text-red-800': order.paymentStatus === 'CANCELED',
                      'bg-yellow-100 text-yellow-600': order.paymentStatus === 'PROCESSING',
                      'bg-gray-100 text-gray-600': order.paymentStatus === 'INITIATED',
                    }"
                  >
                    {{ order.paymentStatus }}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="px-3 inline-flex text-xs leading-5 font-semibold rounded-full text-center text-gray-600"
                    :class="{
                      'bg-green-100 text-green-800': order.fulfillmentStatus === 'FULFILLED',
                      'bg-red-200 text-red-800': order.fulfillmentStatus === 'UNFULFILLED',
                      'bg-yellow-100 text-yellow-600': order.fulfillmentStatus === 'PARTIALLYFULFILLED',
                    }"
                  >
                    {{ order.fulfillmentStatus }}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Rs {{ order.totalAmount }}</div>
                </td>

                <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <router-link
                    :to="{ name: 'product-edit', params: { id: order.id } }"
                    class="text-indigo-600 hover:text-indigo-900"
                    >Edit</router-link
                  >
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToOrder(id) {
      this.$router.push({
        name: 'order-view',
        params: {
          id,
        },
      })
    },
  },
}
</script>
