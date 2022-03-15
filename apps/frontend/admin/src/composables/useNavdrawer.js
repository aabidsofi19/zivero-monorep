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
    open.value = !open.value
  }

  return { isDrawerOpen, toggleDrawer, open }
}
