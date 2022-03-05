<template>
  <div class="w-56 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-30 hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Sort <font-awesome-icon icon="sort" class="w-5 h-5 ml-2 -mr-1 text-white" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem
              v-for="option of sortingOptions"
              :key="option.value"
              v-slot="{ active }"
              @click="setSort(option.value)"
            >
              <button
                :class="[
                  active ? 'bg-mint text-gray-800' : 'text-gray-900',
                  option.value == selected ? 'bg-mint text-gray-800 border-l-3 border-teal-800' : '',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                {{ option.title }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import useFilters from '../composables/useFilters'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  props: {
    sortingOptions: {
      type: Object,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  emits: ['onSort'],

  methods: {
    setSort(value) {
      this.$emit('onSort', value)
    },
  },
  // setup() {
  //   const { setSortBy, filterState } = useFilters()
  //   // eslint-disable-next-line prefer-destructuring
  //   // const sortBy = filterState.value.filterInput.sortBy
  //   const { sortingOptions } = filterState.value
  //   return {
  //     sortingOptions,
  //     filterState,
  //     setSortBy,
  //   }
  // },
}
</script>
