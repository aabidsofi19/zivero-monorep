<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="flex my-6">
      <div class="text-xl">
        <span class="p-3 border">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>
        </span>
        <span class="px-3 font-bold"> Add A Product</span>
        {{ productData }}
        selected options {{ selectedOptions }}
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="col-span-2 h-auto pb-20 space-y-5">
        <v-card outlined>
          <v-card-body>
            <v-input v-model="productData.name" :label="'name'" outlined placeholder="name"></v-input>
            <v-rich-text v-model="productData.description"></v-rich-text>
          </v-card-body>
        </v-card>

        <v-card outlined>
          <v-card-body>
            <div>
              <p class="text-black text-lg font-bold my-3">Add Media</p>
              <p class="mt-5 mb-2">Add Images to show product details</p>
            </div>
            <div
              class="flex justify-center items-center h-28 w-full border-dotted border-2 border-gray-500 hover:border-blue-600 my-5 rounded-lg"
            >
              <v-button> Add File </v-button>
            </div>
          </v-card-body>
        </v-card>
        <v-card outlined class="space-y-3">
          <v-card-heading>Pricing</v-card-heading>
          <v-card-body>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <v-input v-model="productData.price" label="Price" type="number"></v-input>
              <v-input v-model="productData.discountPercent" label="Discount Percent" type="number"></v-input>
            </div>
          </v-card-body>
          <v-card-footer>
            <v-input label="Cost Per Item" type="number"></v-input>
            <p class="text-sm">Customers wont see it</p>
          </v-card-footer>
        </v-card>
        <v-card>
          <v-card-heading>Inventory</v-card-heading>
          <v-card-body>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <v-input label="SKU (Stock Keeping Unit)"></v-input>
              <v-input label="Barcode (ISBN, UPC, GTIN, etc.)"></v-input>
            </div>
          </v-card-body>
          <v-card-footer>
            <p class="text-lg font-bold text-black">Quantity</p>
            <v-input class="w-1/2" type="number" v-model="productData.quantity"></v-input>
            <p class="text-sm">Customers wont see it</p>
          </v-card-footer>
        </v-card>
        <variant-options v-model="selectedOptions" :options="variantOptions"></variant-options>
        {{ variationCombinations }}
        <variantions-field :variants="selectedOptions" v-model="productData.variations"></variantions-field>
      </div>
      <!--end col 1-->

      <div class="space-y-3">
        <product-status-field></product-status-field>

        <product-organization></product-organization>
      </div>
    </div>
  </div>
</template>
<script>
import { VCard, VCardBody, VCardHeading, VCardFooter } from '../components/AppCard.vue'
import VInput from '../components/BaseInput.vue'
import VRichText from '../components/BaseRichTextInput.vue'
import VButton from '../components/BaseButton.vue'
import VariantOptions from '../components/ProductCreateFormOptions.vue'
import VariantionsField from '../components/ProductCreateFormVariants.vue'
import ProductStatusField from '../components/ProductCreateFormStatus.vue'
import ProductOrganization from '../components/ProductCreateOrganization.vue'

export default {
  components: {
    VCard,
    VInput,
    VRichText,
    VButton,
    VCardBody,
    VCardHeading,
    VCardFooter,
    VariantOptions,
    ProductStatusField,
    VariantionsField,
    ProductOrganization,
  },
  data() {
    return {
      variantOptions: {
        color: ['red', 'green'],
        size: ['small', 'medium', 'large'],
      },

      selectedOptions: {},

      productData: {
        name: '',
        brand: '',
        category: '',
        description: '',
        variations: [],
        tags: '',
        images: '',
        status: '',
        price: '',
        discountPercent: '',
      },
    }
  },

  computed: {},
}
</script>
