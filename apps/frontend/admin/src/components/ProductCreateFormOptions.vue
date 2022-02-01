<script setup>
import { VCard, VCardBody, VCardHeading, VCardFooter } from './AppCard.vue'
import VInput from './BaseInput.vue'
import { reactive, ref, watch, computed } from 'vue'

import ProductOptionForm from './ProductOptionForm.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
  options: {
    type: Object,
    default: {},
  },
})

const emit = defineEmits(['update:modelValue'])

// const options = {
//   color: ['red', 'green'],
//   size: ['small', 'medium', 'large'],
// }

// const selectedOptions = ref({})

const selectedOptions = computed({
  get: () => props.modelValue,
  set: value => {
    console.log('setting selectedOptions', value)
    emit('update:modelValue', value)
  },
})

const editing = ref('') // option thats being currently edited

const cleanOptions = computed(() => {
  const unusedOptions = {}
  Object.keys(props.options).forEach(element => {
    if (!Object.keys(selectedOptions.value).includes(element)) {
      unusedOptions[element] = props.options[element]
    }
  })

  return unusedOptions
})

const addOptionData = reactive({
  option: Object.keys(cleanOptions.value)[0],
  variants: [],
})

const editOptionData = reactive({
  option: '',
  variants: '',
})

const showEditForm = option => {
  editing.value = option
  editOptionData.option = option
  editOptionData.variants = selectedOptions.value[option]
}

const addFormShown = ref(true)

const updateOption = () => {
  selectedOptions.value[editOptionData.option] = editOptionData.variants
  editing.value = ''
}

const editableOptions = computed(() => {
  const optionsCopy = { ...cleanOptions.value }
  optionsCopy[editing.value] = props.options[editing.value]

  return optionsCopy
})

const saveOption = () => {
  console.log('onDone')

  selectedOptions.value[addOptionData.option] = addOptionData.variants
  addOptionData.option = Object.keys(cleanOptions.value)[0]
  addOptionData.variants = []
  addFormShown.value = false
}
</script>

<template>
  <v-card outlined>
    <v-card-heading>Options</v-card-heading>

    <div class="border-b p-3 py-6" v-for="(values, option) in selectedOptions" :key="option">
      <!-- selected Options -->

      <div v-if="editing != option">
        <div class="flex justify-between">
          <span class="text-black font-bold">{{ option }}</span>
          <button @click="showEditForm(option)" class="px-3 py-1 rounded font-thin text-black border hover:bg-gray-100">
            Edit
          </button>
        </div>
        <div class="flex gap-2">
          <div v-for="value in values" :key="value" class="rounded-full bg-gray-200 px-3 py-1">{{ value }}</div>
        </div>
      </div>
      <div v-else>
        <product-option-form v-model="editOptionData" :options="editableOptions"></product-option-form>
        <button
          class="my-3 px-3 py-1 rounded font-thin text-black border border-gray-500 hover:bg-gray-100"
          @click="updateOption"
        >
          Done
        </button>
      </div>
    </div>

    <v-card-body v-if="addFormShown">
      <product-option-form v-model="addOptionData" :options="cleanOptions"></product-option-form>
      <button class="px-3 py-1 rounded font-thin text-black border hover:bg-gray-100" @click="saveOption">Done</button>
    </v-card-body>
    <v-card-footer>
      <button class="font-light text-blue-500" @click="addFormShown = true">
        <span> <font-awesome-icon icon="plus" class="mr-6"></font-awesome-icon></span> Add Other
      </button>
    </v-card-footer>
  </v-card>
</template>
