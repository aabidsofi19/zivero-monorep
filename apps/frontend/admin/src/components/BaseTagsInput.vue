<template>
  <div class="flex w-full">
    <p>{{ currentTag }}</p>
    <div>{{ tags }}</div>
    <v-input
      v-model="currentTag"
      :outlined="false"
      @keyup.enter="addTag"
    />
  </div>
</template>

<script>
import VInput from './BaseInput.vue'

export default {
  components: {
    VInput,
  },
  data: () => ({
    currentTag: 'h',
    tags: [],
  }),
  methods: {
    addTag() {
      this.tags.push(this.currentTag)
      this.currentTag = ''
    },
  },
}
</script>
