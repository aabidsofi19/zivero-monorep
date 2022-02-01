<template>
  <div class="w-full h-full">
    <nav-bar />
    <div class="flex flex-no-wrap w-full h-full">
      <!-- Sidebar starts -->

      <side-bar class=""></side-bar>
      <!-- Sidebar ends -->
      <!-- Remove class [ h-64 ] when adding a card block -->
      <div class="bg-gray-100 md:pl-64 md:py-5 px-2 md:px-6 m-0 w-full h-full">
        <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
        <div class="w-full h-full">
          <slot />
        </div>
        <!-- Place your content here -->
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from '../components/AppSideBar.vue'
import navBar from '../components/TheNavBar.vue'

export default {
  name: 'SideBarWithIconsAtBottom',
  components: {
    sideBar,
    navBar,
  },
}
</script>
