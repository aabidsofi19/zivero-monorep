<script setup>
import { ref, computed } from 'vue'
import useNavdrawer from '../composables/useNavdrawer'

const menuItems = {
  home: {
    icon: 'home',
    link: '/',
  },
  products: {
    icon: 'tag',
    submenu: {
      'All products': {
        icon: null,
      },
    },
  },
  orders: {
    icon: 'box',
    submenu: true,
  },
  customers: {
    icon: 'user',
    submenu: true,
  },
}

const { toggleDrawer, isDrawerOpen } = useNavdrawer()
console.log('isOpen', isDrawerOpen)
const active = ref('home')
function clickMenuLink(key) {
  active.value = key
}
</script>

<template>
  <transition name="slide-fade" :duration="1000">
    <nav
      class="drawer fixed top-0 bottom-0 w-2/3 bg-gray-100 h-auto z-50 md:top-16 md:my-8 md:z-0 p-5 md:w-60"
      v-if="isDrawerOpen"
    >
      <div class="text-right px-4 text-xl md:hidden w-full">
        <font-awesome-icon icon="times" @click="toggleDrawer"></font-awesome-icon>
      </div>

      <div v-for="(item, key) in menuItems" :key="key">
        <a href="#" class="nav-link" :class="{ 'bg-blue-100 text-green-900': active == key }">
          <font-awesome-icon :icon="item.icon" />
          <span class="mx-4 text-lg font-bold" @click="clickMenuLink(key)"> {{ key }} </span>
        </a>

        <div v-show="active == key">
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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
