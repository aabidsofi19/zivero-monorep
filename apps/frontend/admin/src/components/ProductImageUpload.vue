<script setup>
import { ref, onMounted } from 'vue'
import { includeScript } from 'utils'
import { VCard, VCardBody } from './AppCard.vue'
import VButton from './BaseButton.vue'
import ProductImageThumbnail from './ProductImageUploadThumbnail.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  update: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const uploadedImages = ref([])

const initProductImageUpload = () => {
  console.log('update')
  props.modelValue.forEach(url => {
    uploadedImages.value.push({
      url,
      thumbnail_url: url,
      public_id: url,
    })
  })
}

onMounted(() => {
  console.log('mounted')
  if (props.update) {
    initProductImageUpload()
  }
  includeScript('widget.cloudinary.com/v2.0/global/all.js')
})

const openUploadModel = () => {
  window.cloudinary
    .openUploadWidget(
      { cloud_name: 'dh3azc5sk', upload_preset: 'e4ftjcge', return_delete_token: true },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done uploading..: ', result.info)
          const url = result.info.secure_url
          emit('update:modelValue', [...props.modelValue, url])
          uploadedImages.value.push(result.info)
        }
      },
    )
    .open()
}

const deleteImage = image => {
  console.log('deleting image', image)
  const index = uploadedImages.value.findIndex(i => i.public_id === image.public_id)
  uploadedImages.value.splice(index, 1)
  emit(
    'update:modelValue',
    props.modelValue.filter(i => i !== image.secure_url),
  )
}
</script>

<template>
  <v-card outlined>
    <v-card-body>
      <h3>Media</h3>
      <div class="flex gap-2">
        <product-image-thumbnail
          v-for="image of uploadedImages"
          :key="image.public_id"
          :src="image.thumbnail_url"
          alt="product thumbnail"
          @remove="deleteImage(image)"
        ></product-image-thumbnail>
      </div>
      <div
        class="flex py-3 flex-col justify-center items-center w-full border-dotted border-2 border-gray-500 hover:border-blue-600 my-5 rounded-lg"
      >
        <v-button @click="openUploadModel"> Add File </v-button>
        <p class="mt-5 mb-2">Add Images to show product details</p>
      </div>
    </v-card-body>
  </v-card>
</template>
