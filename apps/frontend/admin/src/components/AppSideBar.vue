<script setup>
import { useRoute } from 'vue-router'
import useNavdrawer from '../composables/useNavdrawer'

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
    },
  },
  orders: {
    to: { name: 'products' },
    icon: 'box',
    submenu: true,
  },
  customers: {
    to: { name: 'products' },
    icon: 'user',
    submenu: true,
  },
}

const { toggleDrawer, isDrawerOpen } = useNavdrawer()
console.log('isOpen', isDrawerOpen)

const route = useRoute()
</script>

<template>
  <transition name="fade" :duration="1000">
    <nav
      v-if="isDrawerOpen"
      class="drawer fixed top-0 bottom-0 w-2/3 bg-white h-auto z-50 md:pt-16 md:z-0 p-5 md:w-60 border-r-2 shadow-sm md:shadow-none"
    >
      <div class="text-right px-4 text-xl md:hidden w-full">
        <font-awesome-icon icon="times" @click="toggleDrawer"></font-awesome-icon>
      </div>

      <div v-for="(item, key) in menuItems" :key="key">
        <router-link :to="item.to" :class="route.name == item.to.name ? 'nav-link-active' : 'nav-link'">
          <font-awesome-icon :icon="item.icon" />
          <span class="mx-4 text-lg font-bold"> {{ key }} </span>
        </router-link>

        <div v-show="route.name == item.to.name">
          <a v-for="(submenu, key_) in item.submenu" :key="key_" class="nav-link">
            <font-awesome-icon :icon="submenu.icon" />
            <span class="pl-8 text-lg font-normal"> {{ key_ }} </span>
            <span class="flex-grow text-right"> </span>
          </a>
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
