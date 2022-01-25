<template>
  <div class="">
    <nav-bar />
    <div class="py-8 flex flex-no-wrap">
      <!-- Sidebar starts -->
      <!-- Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] -->
      <side-bar></side-bar>
      <!-- Sidebar ends -->
      <!-- Remove class [ h-64 ] when adding a card block -->
      <div class="container mx-auto ml-60 py-10 h-64 md:w-4/5 w-11/12 px-6">
        <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border -->
        <div class="w-full h-full rounded border-dashed border-2 border-gray-300">
          <!-- Place your content here -->
          <slot />
        </div>
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
