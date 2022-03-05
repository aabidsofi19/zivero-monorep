<script setup>
import { ref } from 'vue'
import VButton from '../components/BaseButton.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getVariants } from 'graphql-client/queries/collections'

import VariantCreate from '../components/VariantCreateModal.vue'
import VariantEditModal from '../components/VariantEditModal.vue'
import VariantDeleteModal from '../components/VariantDeleteModal.vue'
const { loading, error, result } = useQuery(getVariants)
const variants = useResult(result, [], data => data.variants)

const deleteDialog = ref(false)
const variantToDelete = ref('')
const editDialog = ref(false)
const variantToEdit = ref('')

const deleteVariant = variant => {
  variantToDelete.value = variant
  deleteDialog.value = true
}

const editVariant = variant => {
  variantToEdit.value = variant
  editDialog.value = true
}
</script>

<template>
  <variant-delete-modal :variant="variantToDelete" v-model="deleteDialog"> </variant-delete-modal>
  <variant-edit-modal :variant="variantToEdit" v-model="editDialog"></variant-edit-modal>
  <div>
    <!-- header -->
    <div class="flex justify-between my-4 items-center">
      <span class="text-lg font-semibold font-montserrat text-black">Brands</span>
      <div class="flex items-center text-gray-600">
        <variant-create></variant-create>
      </div>
    </div>
    <!-- table -->
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    value
                  </th>

                  <th></th>
                  <!-- <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th> -->
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="variant in variants" :key="variant.id" class="cursor-pointer">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div>
                        <div class="text-sm text-gray-400 font-medium font-montserrat">#{{ variant.id }}</div>
                        <div class="text-base text-gray-600 font-semibold font-montserrat">{{ variant.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex gap-3 items-center" v-if="variant.name === 'color'">
                      <div class="w-10 h-10 rounded-md shadow-sm" :style="{ backgroundColor: variant.value }"></div>

                      <p>{{ variant.value }}</p>
                    </div>
                    <div class="rounded-md px-3 py-2 font-montserrat w-min bg-mint" v-else>
                      {{ variant.value }}
                    </div>
                  </td>
                  <td>
                    <div class="flex gap-3">
                      <v-button @click="deleteVariant(variant)" base class="text-red-400">
                        <font-awesome-icon icon="trash"></font-awesome-icon
                      ></v-button>
                      <v-button @click="editVariant(variant)" secondary> Edit</v-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
