import { ref, computed } from 'vue'

const open = ref(false)

export default () => {
  const isDrawerOpen = computed(() => {
    return open.value
  })
  function toggleDrawer() {
    console.log('toggke', open.value)
    open.value = !open.value
    console.log('toggke', open.value)
  }

  return { isDrawerOpen, toggleDrawer, open }
}
