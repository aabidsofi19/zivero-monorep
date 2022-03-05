import { ref, computed } from 'vue'

const globalOpen = ref(false)

export default isOpen => {
  const open = isOpen ? ref(isOpen) : globalOpen
  const isDrawerOpen = computed(() => {
    if (screen.width > 600) {
      return true
    }

    return open.value
  })
  function toggleDrawer() {
    //console.log('toggke', open.value)
    open.value = !open.value
    //console.log('toggke', open.value)
  }

  return { isDrawerOpen, toggleDrawer, open }
}
