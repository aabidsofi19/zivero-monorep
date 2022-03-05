<template>
  <div class="p-3 flex flex-wrap justify-center" v-bind="$attrs">
    <button
      v-for="(page, i) in pagesList"
      :key="i"
      class="mx-3 px-2 py-1 rounded"
      :disabled="page === currentPage"
      :class="{ 'bg-blue-600 text-white ': page === currentPage, 'bg-gray-50 text-gray-500': page === '...' }"
      @click="$emit('goToPage', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
import VButton from './BaseButton.vue'

export default {
  components: {
    VButton,
  },
  inheritAttrs: false,
  props: {
    totalPages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  emits: ['goToPage'],
  computed: {
    prevousPages() {
      const pageNo = this.currentPage
      const width = 4
      const pages = []
      if (pageNo > width) {
        pages.push(1)
        pages.push(2)
        pages.push('...')
        pages.push(pageNo - 1)
      } else {
        for (let i = 1; i < pageNo; i++) {
          pages.push(i)
        }
      }

      return pages
    },
    nextPages() {
      const pageNo = this.currentPage
      const { totalPages } = this
      const width = 4
      const pages = []
      if (pageNo < totalPages - width) {
        pages.push(pageNo + 1)
        pages.push(pageNo + 2)
        pages.push('...')
        pages.push(totalPages - 1)
        pages.push(totalPages)
      } else {
        for (let i = pageNo + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      }

      return pages
    },
    pagesList() {
      const pages = [...this.prevousPages, this.currentPage, ...this.nextPages]

      return pages
    },
  },
}
</script>
