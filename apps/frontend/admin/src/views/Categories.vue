<script setup>
import { ref } from 'vue'
import VButton from '../components/BaseButton.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getCategories } from 'graphql-client/queries/collections'
import addCategory from '../components/CategoryCreateModal.vue'
import CategoryEditModal from '../components/CategoryEditModal.vue'
import CategoryDeleteDialog from '../components/CategoryDeleteDialog.vue'
const { loading, error, result } = useQuery(getCategories)
const categories = useResult(result, [], data => data.categories)

const deleteDialog = ref(false)
const categoryToDelete = ref('')

const deleteCategory = id => {
  categoryToDelete.value = id
  deleteDialog.value = true
}
</script>

<template>
  <category-delete-dialog :category="categoryToDelete" v-model="deleteDialog"></category-delete-dialog>

  <div>
    <!-- header -->
    <div class="flex justify-between my-4 items-center">
      <span class="text-lg font-semibold font-montserrat text-black">Categories</span>
      <div class="flex items-center text-gray-600">
        <add-category></add-category>
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
                    description
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    brands
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    genders
                  </th>
                  <th></th>
                  <!-- <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th> -->
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="category in categories" :key="category.id" class="cursor-pointer">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-auto max-h-16 rounded-md w-16 mr-1 overflow-hidden bg-red-400">
                        <img :src="category.image" class="object-cover rounded-md shadow-sm" alt="" />
                      </div>
                      <div>
                        <div class="text-sm text-gray-600 font-semibold font-montserrat">#{{ category.id }}</div>
                        <div class="text-sm text-gray-600 font-medium font-montserrat">{{ category.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-600 font-medium">{{ category.description }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-1">
                      <div class="rounded bg-mint text-sm py-1 px-2" v-for="brand in category.brands" :key="brand">
                        {{ brand.name }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex gap-1">
                      <div class="rounded bg-mint text-sm py-1 px-2" v-for="gender in category.genders" :key="gender">
                        {{ gender }}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex gap-3">
                      <v-button @click="deleteCategory(category)" base class="text-red-400">
                        <font-awesome-icon icon="trash"></font-awesome-icon
                      ></v-button>
                      <category-edit-modal :category="category"></category-edit-modal>
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
