<script setup>
import { reactive, ref } from 'vue'
import useFilters from '../composables/useFilters'
import BaseNavDrawer from './BaseNavDrawer.vue'
import BaseExpandableItem from './BaseExpandableItem.vue'
import BaseListItemGroup, { BaseListItem } from './BaseListItemGroup.vue'
import { pageNo } from '../composables/useProducts'

const props = defineProps(['isOpen', 'toggleDrawer'])

const { fetchFilters, setInputFilter, filterState } = useFilters()
const { result, error, loading } = fetchFilters()

const selectedFilters = reactive({})

const saveFilters = () => {
  // filterState.filterInput = selectedFilters
  const filters = { ...filterState.filterInput, ...selectedFilters }
  pageNo.value = 1
  setInputFilter(filters)
}
</script>

<template>
  <base-nav-drawer :is-open="$props.isOpen" toggle="$props.toggleDrawer" panel-title="More Filters">
    <div v-if="!loading">
      <ul>
        <base-list-item-group v-model="selectedFilters.gender" title="gender">
          <base-list-item v-for="gender in result.filters.genders" :key="gender" :value="gender">
            {{ gender }}
          </base-list-item>
        </base-list-item-group>
        <base-list-item-group v-model="selectedFilters.categories" title="categories" multiselect>
          <base-list-item v-for="category in result.filters.categories" :key="category.id" :value="category.id">{{
            category.name
          }}</base-list-item>
        </base-list-item-group>
        <base-list-item-group v-model="selectedFilters.brands" multiselect title="brands">
          <base-list-item v-for="brand in result.filters.brands" :key="brand.id" :value="brand.id">{{
            brand.name
          }}</base-list-item>
        </base-list-item-group>

        <base-expandable-item title="availabilty">
          <ul>
            <li>Is Available</li>
            <li>Is Not Available</li>
          </ul>
        </base-expandable-item>
      </ul>
    </div>
    <div class="flex justify-between py-5 px-3">
      <button class="px-3 py-2 border rounded-md text-gray-400">Clear Filters</button>
      <button class="px-3 mx-5 py-2 border rounded-md text-white bg-green-800" @click="saveFilters">Done</button>
    </div>
  </base-nav-drawer>
</template>
