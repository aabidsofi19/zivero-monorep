<template>
  <div>
    <editor
      v-model="model"
      api-key="amcbn744ff0x5gvrf8z0vvxiasj7ldn8f9cqr07cnwyugt26"
      :init="{
        height: 400,

        width: '100%',
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code ',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo| fullscreen | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
      }"
      v-bind="$attrs"
    >
      <slot />
    </editor>
    <div v-for="error of $props.errors" :key="error.$uid" class="mt-1">
      <div class="text-red-600 italic text-sm">{{ error.$message }}</div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'App',
  components: {
    editor: Editor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
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
