import { ref, readonly } from 'vue'

const validators = ref([])

export default () => {
  const addValidator = validator => {
    validators.value.push(validator)
  }

  return {
    validators: readonly(validators),
    addValidator,
  }
}
