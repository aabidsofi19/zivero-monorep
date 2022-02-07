<template>
  <v-card>
    <v-card-heading class=""> Variants </v-card-heading>

    <!-- {{ variantMap }} -->
    <!-- {{ variationCombinations }} -->
    <v-card-body class="py-3">
      <div class="overflow-x-auto border">
        <div class="">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Variant
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  SKU
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                ></th>
              </tr>
            </thead>

            <tbody>
              <variants-table-row
                v-for="variantCombination in variationCombinations"
                :ref="rowKey(variantCombination)"
                :key="rowKey(variantCombination)"
                v-model="variations[rowKey(variantCombination)]"
                :variant-ids="getVariantIds(variantCombination)"
                :variants="variantCombination"
                @remove:model-value="removeVariation(rowKey(variantCombination))"
              >
              </variants-table-row>
            </tbody>
          </table>
        </div>
      </div>
    </v-card-body>
  </v-card>
</template>

<script>
import useVariantsValidator from '../composables/useVariantsValidator'
import { VCard, VCardBody, VCardHeading } from './AppCard.vue'
import VariantsTableRow from './ProductCreateVariantsTableRow.vue'

export default {
  components: {
    VCard,
    VCardBody,
    VCardHeading,
    VariantsTableRow,
  },
  props: {
    selectedVariants: {
      type: Object,
      required: true,
    },
    allVariants: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],

  setup() {
    const { validators } = useVariantsValidator()

    const validate = () => {
      let validated = true
      validators.value.forEach(v$ => {
        if (v$.$invalid) {
          validated = false
        }
      })

      return validated
    }

    return {
      validate,
    }
  },

  data() {
    return {
      variations: {},
    }
  },

  computed: {
    // returns cartesian products of the diferent types of variants
    // [[{color:red},{size:xl},[...]],[...]]
    variationCombinations() {
      const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
      if (Object.keys(this.selectedVariants).length === 0) {
        return []
      }

      return cartesian(...this.variantMap)
    },

    // returns the variantsList in the form [[{color:red},{color:green}],[...]]
    variantMap() {
      const map = []
      Object.keys(this.selectedVariants).forEach(key => {
        const temp = []
        this.selectedVariants[key].forEach(value => {
          const variant = {}
          variant[key] = value
          temp.push(variant)
        })
        map.push(temp)
      })

      return map
    },
  },

  watch: {
    variations: {
      deep: true,
      handler(variations) {
        this.$emit('update:modelValue', Object.values(variations))
      },
    },
  },

  mounted() {
    this.modelValue.forEach(variation => {
      const variantIds = []
      variation.variant.forEach(variant => {
        variantIds.push(variant.id)
      })
      const key = variantIds.join()
      this.variations[key] = {
        price: variation.price,
        quantity: variation.quantity,
        variant: variantIds,
      }
    })
  },

  methods: {
    getVariantId(variant) {
      const key = Object.keys(variant)[0]
      const val = variant[key]
      let id = ''

      this.allVariants.forEach(el => {
        if (el.name === key && el.value === val) {
          id = el.id
        }
      })

      return id
    },

    getVariantIds(variants) {
      const ids = []

      if (variants instanceof Array) {
        variants.forEach(variant => {
          ids.push(this.getVariantId(variant))
        })
      } else {
        ids.push(this.getVariantId(variants))
      }

      return ids
    },

    rowKey(variantCombination) {
      const ids = this.getVariantIds(variantCombination)

      return ids.join()
    },
    removeVariation(key) {
      delete this.variations[key]
    },
  },
}
</script>
