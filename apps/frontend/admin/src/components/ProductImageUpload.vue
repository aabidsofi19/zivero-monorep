<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'
import { includeScript } from 'utils'
import { VCard, VCardBody } from './AppCard.vue'
import VButton from './BaseButton.vue'
import ProductImageThumbnail from './ProductImageUploadThumbnail.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const uploadedImages = ref([])

watchEffect(() => {
  if (uploadedImages.value.length < 1 && props.modelValue.length) {
    const initData = props.modelValue.map(url => {
      return {
        public_id: url,
        secure_url: url,
        thumbnail_url: url,
      }
    })
    uploadedImages.value = [...initData, ...uploadedImages.value]
  }
})

const cloudName = 'dh3azc5sk' // replace with your own cloud name
const uploadPreset = 'e4ftjcge' // replace with your own upload preset
let uploadWidget

const initUploadWidget = () => {
  console.log('init widget', window.cloudinary)
  uploadWidget = window.cloudinary.createUploadWidget(
    { cloudName: cloudName, uploadPreset: uploadPreset },
    (error, result) => {
      console.log(error, result)
      if (!error && result && result.event === 'success') {
        //console.log('Done uploading..: ', result.info)
        const url = result.info.secure_url
        emit('update:modelValue', [...props.modelValue, url])
        uploadedImages.value.push(result.info)
      }
    },
  )
}

onMounted(() => {
  initUploadWidget()
  //console.log('mokunted')
  // includeScript('widget.cloudinary.com/v2.0/global/all.js', initUploadWidget)
})

const openUploadModel = () => {
  uploadWidget.open()
}

const deleteImage = image => {
  //console.log('deleting image', image)
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
      <h3 class="text-gray-800 font-lg font-semibold">Media</h3>

      <div class="grid grid-cols-8 gap-4">
        <product-image-thumbnail
          v-for="(image, index) of [...uploadedImages]"
          :key="image.public_id"
          :src="image.thumbnail_url"
          alt="product thumbnail"
          :class="{
            'col-span-2 h-min': index !== 0,
            'col-span-4': index == 0 || index == 1,
          }"
          @remove="deleteImage(image)"
        ></product-image-thumbnail>
      </div>
      <div
        class="flex py-10 flex-col justify-center items-center w-full border-dashed border-2 border-gray-300 hover:border-blue-600 my-5 rounded-lg"
      >
        <v-button @click="openUploadModel"> Add File </v-button>
        <p class="mt-5 mb-2">Add Images to show product details</p>
      </div>
    </v-card-body>
  </v-card>
</template>
