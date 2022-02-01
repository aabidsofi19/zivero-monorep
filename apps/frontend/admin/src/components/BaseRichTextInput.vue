<template>
  <editor
    v-model="model"
    api-key="amcbn744ff0x5gvrf8z0vvxiasj7ldn8f9cqr07cnwyugt26"
    :init="{
      height: 200,
      width: '100%',
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
    }"
    v-bind="$attrs"
  >
    <slot />
  </editor>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'App',
  components: {
    editor: Editor,
  },
  props: ['value'],
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
