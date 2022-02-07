<script setup>
import { computed } from 'vue'

import { useRoute } from 'vue-router'
import useNavdrawer from '../composables/useNavdrawer'
import BaseNavLink from './BaseNavLink.vue'

const menuItems = {
  home: {
    icon: 'home',
    to: { name: 'dashboard' },
  },
  products: {
    icon: 'tag',
    to: { name: 'products-all' },
    submenu: {
      'All products': {
        icon: null,
        to: { name: 'products-all' },
      },
      'New Product': {
        icon: null,
        to: { name: 'products-create' },
      },
    },
  },
  orders: {
    to: { name: 'orders-all' },
    icon: 'box',
    submenu: {
      'All Orders': {
        icon: null,
        to: { name: 'orders-all' },
      },
    },
  },
  customers: {
    to: { name: 'products' },
    icon: 'user',
    submenu: true,
  },
}

const activeSubmenu = computed(() => {
  const route = useRoute()

  return Object.keys(menuItems).find(key => {
    const item = menuItems[key]

    if (item.submenu) {
      return Object.keys(item.submenu).find(subkey => {
        const subitem = item.submenu[subkey]

        return subitem.to.name === route.name
      })
    }

    return item.to.name === route.name
  })
})

const { toggleDrawer, isDrawerOpen } = useNavdrawer()
console.log('isOpen', isDrawerOpen)

const route = useRoute()
</script>

<template>
  <transition name="fade" :duration="1000">
    <nav
      v-if="isDrawerOpen"
      class="gap-4 font-montserrat drawer fixed top-0 bottom-0 w-2/3 bg-white h-auto z-50 md:pt-16 md:z-0 pr-2 md:w-48 border-r-2 shadow-sm md:shadow-none"
    >
      <div class="text-right px-4 text-xl md:hidden w-full">
        <font-awesome-icon icon="times" @click="toggleDrawer"></font-awesome-icon>
      </div>

      <div v-for="(item, key) in menuItems" :key="key" class="mb-4">
        <base-nav-link :active="route.name == item.to.name">
          <router-link :to="item.to">
            <font-awesome-icon :icon="item.icon" />
            <span class="px-3"> {{ key }} </span>
          </router-link>
        </base-nav-link>

        <div v-show="activeSubmenu == key" class="">
          <router-link
            v-for="(submenu, key_) in item.submenu"
            :key="key_"
            :to="submenu.to"
            :class="[
              route.name == submenu.to.name
                ? 'border-l-4  flex bg-cloud bg-opacity-20 border-x-teal-700 font-light  text-teal-700'
                : 'text-gray-800',
              'my-1 py-1 font-light text-sm',
            ]"
          >
            <font-awesome-icon :icon="submenu.icon" />
            <span class="pl-9 font-normal"> {{ key_ }} </span>
          </router-link>
        </div>
      </div>
    </nav>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-100%);
}

/* .fade-enter-to {
  transform: translateX(100%);
} */
</style>
