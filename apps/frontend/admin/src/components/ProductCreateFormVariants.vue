<template>
  <v-card>
    <v-card-heading> Variants </v-card-heading>
    <!-- {{ variantMap }} -->
    <!-- {{ variationCombinations }} -->
    <v-card-body class="'p-0">
      <div class="overflow-x-auto">
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
              <tr v-for="variantCombination in variationCombinations" :key="variantLabel(variantCombination)">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <!-- <div class="flex-shrink-0">
                      <a href="#" class="block relative">
                        <img
                          alt="profil"
                          src="/images/person/8.jpg"
                          class="mx-auto object-cover rounded-full h-10 w-10"
                        />
                      </a>
                    </div> -->
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ variantLabel(variantCombination) }}
                        <!-- {{ variantCombination }} -->
                        <!-- {{ variantCombination.reduce((x, y) => x + ' / ' + y) }} -->
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <v-input placeholder="$ 100"></v-input>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <v-input :value="0"></v-input>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <v-input></v-input>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex border border-gray-400 rounded-md text-gray-600">
                    <button class="py-2 border-r px-5 border-gray-400 hover:bg-gray-200">Edit</button>
                    <button class="py-2 px-5 hover:bg-gray-200">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </v-card-body>
  </v-card>
</template>

<script>
import { VCard, VCardBody, VCardHeading } from './AppCard.vue'
import VInput from './BaseInput.vue'

export default {
  components: {
    VCard,
    VCardBody,
    VCardHeading,
    VInput,
  },
  props: {
    variants: {
      type: Object,
      default: {},
    },
  },
  computed: {
    variationCombinations() {
      const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
      if (Object.keys(this.variants).length === 0) {
        return []
      }
      // const combinations = cartesian(...Object.values(this.variants))
      // return combinations
      return cartesian(...this.variantMap)
    },
    variantMap() {
      let map = []
      Object.keys(this.variants).forEach(key => {
        let temp = []
        this.variants[key].forEach(value => {
          let variant = {}
          variant[key] = value
          temp.push(variant)
        })
        map.push(temp)
      })

      return map
    },
  },
  methods: {
    variantLabel(variantCombination) {
      if (variantCombination instanceof Array) {
        console.log(variantCombination)
        let label = variantCombination.map(variant => {
          // console.log(variant)
          return Object.values(variant)[0]
        })
        console.log(label)
        label = label.reduce((x, y) => x + ' / ' + y)
        return label
      }
      return Object.values(variantCombination)[0]
    },
  },
}
</script>
