<script setup>
import { reactive, ref } from 'vue'

const active = ref(false)

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  errors: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select Values',
  },
  label: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectOption = option => {
  if (props.modelValue.includes(option)) {
    // modelValue.value = modelValue.value.filter(item => item !== option)
    const filtered = props.modelValue.filter(item => item !== option)
    emit('update:modelValue', filtered)
  } else {
    emit('update:modelValue', [...props.modelValue, option])
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-center h-auto h-max-64">
    <label v-if="$props.label" class="self-start" :for="$attrs.id ?? 'input'">
      {{ $props.label }}
    </label>

    <div class="w-full">
      <div class="flex flex-col items-center relative">
        <div class="w-full">
          <div
            class="my-2 p-1 flex border border-gray-400 bg-white rounded"
            :class="[$props.errors.length > 0 ? 'border-red-500' : 'border-gray-400']"
          >
            <div class="flex flex-auto items-center flex-wrap">
              <div
                v-for="selectedOption in modelValue"
                :key="selectedOption"
                class="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300"
              >
                <p class="text-xs font-normal leading-none max-w-full flex-initial mr-2">
                  {{ selectedOption }}
                </p>
                <font-awesome-icon icon="times" @click="selectOption(selectedOption)"></font-awesome-icon>
              </div>
              <div class="flex-1" @click="active = !active">
                <p class="text-gray-300 pl-2">{{ placeholder }}</p>
              </div>
              <!-- <div class="flex-1">
                <input
                  placeholder=""
                  class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                />
              </div> -->
            </div>
            <div class="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center border-gray-200 svelte-1l8159u">
              <button class="cursor-pointer w-6 h-6 text-gray-400 outline-none focus:outline-none">
                <font-awesome-icon icon="sort" @click="active = !active"> </font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
        <!--errors-->
        <div v-for="error of $props.errors" :key="error.$uid" class="mt-1">
          <div class="text-red-600 italic text-sm">{{ error.$message }}</div>
        </div>
        <div
          v-if="active"
          class="shadow top-100 bg-white w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
        >
          <div class="flex flex-col w-full">
            <div
              v-for="option of options"
              :key="option"
              class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-mint"
            >
              <div
                class="flex w-full items-center p-2 pl-2 relative"
                :class="{
                  'border-l-8 border-teal-700': modelValue.includes(option),
                }"
                @click="selectOption(option)"
              >
                <div class="w-full items-center flex border-3">
                  <div class="mx-2 leading-6">{{ option }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
