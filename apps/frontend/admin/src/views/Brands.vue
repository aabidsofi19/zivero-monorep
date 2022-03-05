<script setup>
import { ref } from 'vue'
import VButton from '../components/BaseButton.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getBrands } from 'graphql-client/queries/collections'

import BrandCreate from '../components/BrandCreateModal.vue'
import BrandEditModal from '../components/BrandEditModal.vue'
import BrandDeleteModal from '../components/BrandDeleteModal.vue'
const { loading, error, result } = useQuery(getBrands)
const brands = useResult(result, [], data => data.brands)

const deleteDialog = ref(false)
const brandToDelete = ref('')
const editDialog = ref(false)
const brandToEdit = ref('')

const deleteBrand = brand => {
  brandToDelete.value = brand
  deleteDialog.value = true
}

const editBrand = brand => {
  brandToEdit.value = brand
  editDialog.value = true
}
</script>

<template>
  <brand-delete-modal :brand="brandToDelete" v-model="deleteDialog"> </brand-delete-modal>
  <brand-edit-modal :brand="brandToEdit" v-model="editDialog"></brand-edit-modal>
  <div>
    <!-- header -->
    <div class="flex justify-between my-4 items-center">
      <span class="text-lg font-semibold font-montserrat text-black">Brands</span>
      <div class="flex items-center text-gray-600">
        <brand-create></brand-create>
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
                  <th></th>
                  <!-- <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th> -->
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="brand in brands" :key="brand.id" class="cursor-pointer">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-auto max-h-16 rounded-md w-16 mr-1 overflow-hidden bg-red-400">
                        <img :src="brand.logo" class="object-cover rounded-md shadow-sm" alt="" />
                      </div>
                      <div>
                        <div class="text-sm text-gray-600 font-semibold font-montserrat">#{{ brand.id }}</div>
                        <div class="text-sm text-gray-600 font-medium font-montserrat">{{ brand.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex gap-3">
                      <v-button @click="deleteBrand(brand)" base class="text-red-400">
                        <font-awesome-icon icon="trash"></font-awesome-icon
                      ></v-button>
                      <v-button @click="editBrand(brand)" secondary> Edit</v-button>
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
