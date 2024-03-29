<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="flex my-6">
      <div class="text-xl">
        <span class="p-3 border">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>
        </span>
        <span class="px-3 font-bold"> Add A Product</span>
      </div>
    </div>
    {{ creatingProductError }}
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

        <product-image-upload v-model="productData.images"></product-image-upload>

        <v-card outlined class="space-y-3">
          <v-card-heading>Pricing</v-card-heading>
          <v-card-body>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <v-input
                min="0"
                v-model="productData.price"
                :errors="v$.productData.price.$errors"
                label="Price"
                type="number"
              ></v-input>
              <v-input
                min="0"
                v-model="productData.discountPercent"
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
            <p class="text-lg font-montserrat font-semibold text-gray-800">Quantity</p>
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
          v-model="productOrganizationData"
          :options="productOrganisationOptions"
        ></product-organization>
      </div>
    </div>

    <v-button @click="saveProduct" :loading="creatingProduct"> Save Product </v-button>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
import { getProductCreateData } from 'graphql-client/queries/filter'
import { useVuelidate } from '@vuelidate/core'
import { required, integer, minValue } from '@vuelidate/validators'
import { CREATE_PRODUCT } from 'graphql-client/mutations/product'
import { GET_PRODUCTS_QUERY } from 'graphql-client/queries/productQueries'
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
    const { result, loading } = useQuery(getProductCreateData)
    const variantOptions = useResult(result, {}, data => data.variants)
    const productOrganisationOptions = useResult(result, {}, data => data.filters)
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

    const { mutate: createProduct, loading: creatingProduct, error: productCreateError } = useMutation(CREATE_PRODUCT)
    const v$ = useVuelidate()

    return {
      cleanOptions,
      productOrganisationOptions,
      variantOptions,
      createProduct,
      creatingProduct,
      productCreateError,
      v$,
    }
  },

  data() {
    return {
      selectedOptions: {},

      productData: {
        name: '',
        description: '',
        variations: [],
        tags: [],
        images: [],
        status: 'draft',
        price: null,
        discountPercent: null,
        quantity: null,
      },
      productOrganizationData: {
        brand: '',
        category: '',
        gender: '',
      },
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
      Object.keys(this.productOrganizationData).forEach(key => {
        clean[key] = this.productOrganizationData[key].value
      })

      return clean
    },
  },

  methods: {
    validateForm() {
      this.v$.$validate()
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
        this.createProduct(
          { ProductInput },
          {
            update: (cache, { data: { product } }) => {
              const data = cache.readQuery({ query: GET_PRODUCTS_QUERY })

              if (data && data.products) {
                data.products.push(product)
                cache.writeQuery({ query: GET_PRODUCTS_QUERY, data })
              }
            },
          },
        )
      }
    },
  },
}
</script>
