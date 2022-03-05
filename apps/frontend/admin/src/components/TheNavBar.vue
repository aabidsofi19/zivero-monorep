<script setup>
import { FontAwesomeIcon as fIcon } from '@fortawesome/vue-fontawesome'
import useNavdrawer from '../composables/useNavdrawer'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import BaseButton from './BaseButton.vue'
import { useLogout, useUser } from '../composables/useUser'

const { logout, loading: loggingOut } = useLogout()
const { user } = useUser()
const { toggleDrawer } = useNavdrawer()
</script>

<template>
  <!-- start navbar -->
  <div
    class="fixed w-screen z-10 flex flex-row flex-wrap items-center justify-between bg-white p-3 px-6 border-b border-gray-300"
  >
    <!-- logo -->
    <div class="w-56 flex flex-row items-center">
      <button class="mr-4 text-right text-gray-900 md:hidden" @click="toggleDrawer()">
        <f-icon icon="bars"></f-icon>
      </button>
      <!-- <img src="img/logo.png" class="w-10 flex-none" /> -->
      <div>
        <span class="capitalize font-medium text-lg text-gray-800 font-montserrat px-1">zivero</span>
        <span class="capitalize font-medium text-lg text-gray-600 font-montserrat"> Admin</span>
      </div>
    </div>

    <div class="">
      <Popover v-slot="{ open }" class="relative">
        <PopoverButton
          :class="open ? '' : 'text-opacity-90'"
          class="bg-cloud text-white font-medium py-2 px-4 rounded-lg"
        >
          <span> {{ user.username }}</span>
        </PopoverButton>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel class="absolute z-10 w-40 mt-5 right-0 px-3 rounded py-2 bg-white shadow-lg">
            <BaseButton base class="w-full bg-mint" @click="logout" :loading="loggingOut"> logout </BaseButton>
          </PopoverPanel>
        </transition>
      </Popover>
    </div>
  </div>
</template>

<style scoped lang="sass">
.nav-icon-link
  @apply mr-2 transition duration-500 ease-in-out hover:text-gray-900
</style>
