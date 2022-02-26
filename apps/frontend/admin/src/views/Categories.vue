<script setup>
import VButton from '../components/BaseButton.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getCategories } from 'graphql-client/queries/collections'
import addCategory from '../components/CategoryFormModal.vue'
const { loading, error, result } = useQuery(getCategories)
const categories = useResult(result, [], data => data.categories)
</script>

<template>
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
                  <!-- <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th> -->
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="category in categories" :key="category.id" class="cursor-pointer">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div>
                        <img :src="category.image" alt="" />
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
