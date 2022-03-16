<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="flex my-6">
      <div class="text-xl">
        <span class="p-3 border">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>
        </span>
        <span class="px-3 font-bold"> Update Product</span>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="col-span-2 h-auto pb-20 space-y-5">
        <v-card outlined>
          <v-card-body>
            <v-input
              v-model="productData.name"
              :label="'name'"
              :errors="v$.productData.name.$errors"
              outlined
              placeholder="name"
            ></v-input>
            <v-rich-text v-model="productData.description" :errors="v$.productData.description.$errors"></v-rich-text>
          </v-card-body>
        </v-card>

        <product-image-upload v-model="productData.images" :update="true"></product-image-upload>

        <v-card outlined class="space-y-3">
          <v-card-heading>Pricing</v-card-heading>
          <v-card-body>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <v-input
                v-model="productData.price"
                min="0"
                :errors="v$.productData.price.$errors"
                label="Price"
                type="number"
              ></v-input>
              <v-input
                v-model="productData.discountPercent"
                min="0"
                :errors="v$.productData.discountPercent.$errors"
                label="Discount Percent"
                type="number"
              ></v-input>
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
            <v-input
              v-model="productData.quantity"
              class="w-1/2"
              type="number"
              :errors="v$.productData.quantity.$errors"
            ></v-input>
            <p class="text-sm">Customers wont see it</p>
          </v-card-footer>
        </v-card>

        <variant-options v-model="selectedOptions" :options="cleanOptions"></variant-options>
        <variantions-field
          v-if="Object.keys(selectedOptions).length > 0"
          ref="variationsField"
          v-model="productData.variations"
          :selected-variants="selectedOptions"
          :all-variants="variantOptions"
        ></variantions-field>
      </div>
      <!--end col 1-->

      <div class="space-y-3">
        <product-status-field v-model="productData.status"></product-status-field>

        <product-organization
          ref="productOrganisation"
          v-model="productOrganisationData"
          :options="productOrganisationOptions"
        ></product-organization>
      </div>
    </div>
    {{ deleteError }}
    {{ updateError }}
    <div class="flex justify-between items-center border-t mt-3 py-4">
      <div class="flex gap-2">
        <v-button danger @click="deleteProduct" :loading="deleting"> Delete Product </v-button>
        <!--   <v-button secondary @click="deleteProduct"> Archive </v-button>
        -->
      </div>

      <v-button @click="saveProduct" :loading="updating"> Save </v-button>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, integer } from '@vuelidate/validators'
import { UPDATE_PRODUCT, DELETE_PRODUCT } from 'graphql-client/mutations/product'
import { GET_PRODUCTS_QUERY, GET_PRODUCT_EDIT_DATA } from 'graphql-client/queries/productQueries'
import { VCard, VCardBody, VCardHeading, VCardFooter } from '../components/AppCard.vue'
import VInput from '../components/BaseInput.vue'
import VRichText from '../components/BaseRichTextInput.vue'
import VButton from '../components/BaseButton.vue'
import VariantOptions from '../components/ProductCreateFormOptions.vue'
import VariantionsField from '../components/ProductCreateFormVariants.vue'
import ProductStatusField from '../components/ProductCreateFormStatus.vue'
import ProductOrganization from '../components/ProductCreateOrganization.vue'
import ProductImageUpload from '../components/ProductImageUpload.vue'

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
    ProductImageUpload,
  },

  setup() {
    const { params } = useRoute()
    const productId = params.id
    const { result, loading, onResult } = useQuery(GET_PRODUCT_EDIT_DATA, { id: productId })
    const variantOptions = useResult(result, [], data => data.variants)
    const productOrganisationOptions = useResult(result, {}, data => data.filters)

    const productData = ref({
      name: '',
      description: '',
      variations: [],
      tags: [],
      images: [],
      status: 'active',
      price: null,
      discountPercent: null,
      quantity: null,
    })

    const productOrganisationData = ref({ brand: '', category: '', gender: '' })
    const selectedOptions = ref({})

    const initProductInput = data => {
      const fields = ['name', 'description', 'tags', 'images', 'status', 'price', 'discountPercent', 'quantity']
      const initData = {}

      fields.forEach(field => {
        initData[field] = data[field]
      })

      return initData
    }

    const initProductOrganisation = ({ gender, category, brand }) => {
      const initData = {}
      initData.gender = { label: gender, value: gender }
      initData.category = { label: category.name, value: category.id }
      initData.brand = { label: brand.name, value: brand.id }

      return initData
    }

    const initSelectedOptions = ({ availableVariants }) => JSON.parse(availableVariants)

    const initProductVariations = ({ variations }) => {
      const variationsCopy = variations.slice()
      variationsCopy.map(variation => ({
        price: variation.price,
        quantity: variation.quantity,
        variant: variation.quantity,
      }))

      return variationsCopy
    }

    onResult(({ data }) => {
      productData.value = initProductInput(data.product)
      productOrganisationData.value = initProductOrganisation(data.product)
      selectedOptions.value = initSelectedOptions(data.product)
      productData.value.variations = initProductVariations(data.product)
    })

    const cleanOptions = computed(() => {
      if (loading.value) {
        return {}
      }
      const Options = {}

      variantOptions.value.forEach(element => {
        if (element.name in Options) {
          Options[element.name].push(element.value)
        } else {
          Options[element.name] = [element.value]
        }
      })

      return Options
    })

    const { mutate: updateProduct, loading: updating, error: updateError } = useMutation(UPDATE_PRODUCT)
    const { mutate: deleteProduct, loading: deleting, error: deleteError } = useMutation(DELETE_PRODUCT)
    const v$ = useVuelidate()

    return {
      productId,
      productData,
      productOrganisationData,
      selectedOptions,
      cleanOptions,
      productOrganisationOptions,
      variantOptions,
      deleting,
      updating,
      deleteError,
      updateError,
      updateProduct,
      DeleteProduct: deleteProduct,
      v$,
    }
  },

  validations: () => ({
    productData: {
      name: { required },
      description: { required },
      price: { required, integer, minValue: 10 },
      discountPercent: { required, integer },
      quantity: { required, integer },
    },
  }),

  computed: {
    cleanedProductOrganisationData() {
      const clean = {}
      Object.keys(this.productOrganisationData).forEach(key => {
        clean[key] = this.productOrganisationData[key].value
      })

      return clean
    },
  },

  methods: {
    validateForm() {
      this.v$.productData.$validate()
      this.$refs.productOrganisation.v$.$validate()
      const variationsComponent = this.$refs.variationsField

      if (variationsComponent !== undefined && variationsComponent !== null) {
        if (variationsComponent.validate() === false) {
          return false
        }
      }

      return !this.v$.productData.$invalid && !this.$refs.productOrganisation.v$.$invalid
    },

    saveProduct() {
      if (this.validateForm()) {
        const ProductInput = { ...this.productData, ...this.cleanedProductOrganisationData }
        this.updateProduct({ id: this.productId, ProductInput })
      }
    },

    deleteProduct() {
      this.DeleteProduct(
        { id: this.productId },
        {
          update: cache => {
            let data = cache.readQuery({ query: GET_PRODUCTS_QUERY })

            if (data.products) {
              data = data.products.filter(product => product.id !== this.productId)
              cache.writeQuery({ query: GET_PRODUCTS_QUERY, data })
            }
          },
        },
      )
    },
  },
}
</script>
