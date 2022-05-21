<template>
  <div class="m-product-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="validation-block">
      <div class="flex w-full justify-center items-center">
        <AInput :label="'Name'" v-model="name.value" />
      </div>
      <div class="flex w-full justify-center items-center">
        <p class="text-red-700 font-semibold">{{ name.errorMessage }}</p>
      </div>
    </div>
    <div class="validation-block">
      <div class="flex w-full justify-center items-center">
        <AInput :label="'Price(€)'" v-model="price.value" :type="'number'" />
      </div>
      <div class="flex w-full justify-center items-center">
        <p class="text-red-700 font-semibold">{{ price.errorMessage }}</p>
      </div>
    </div>
    <div class="flex w-full justify-center items-center">
      <ATextArea
        :label="'Description'"
        v-model="description"
        :id="'description'"
        :name="'description'"
      />
    </div>
    <div class="flex w-full justify-center items-center">
      <AInput :label="'Image'" v-model="image" />
    </div>
    <div class="flex justify-center items-center mt-2 w-full">
      <AButton @click="submitProduct" :background-color="'bg-indigo-500'">
        {{ isCreateProduct ? 'Add product' : 'Update product' }}
      </AButton>
    </div>
    <div>
      <router-link :to="'/admin/products'">
        <AButton class="ml-8" :backgroundColor="'bg-red-500'">
          {{ 'Back' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import AInput from '@/components/atoms/a-input.vue'
import ATextArea from '@/components/atoms/a-textarea.vue'
import { CREATE_PRODUCT, FETCH_PRODUCT, UPDATE_PRODUCT } from '@/store/modules/products/types'
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { firstLetterToUppercase } from '@/helpers/format.js'
import { formatPrice } from '@/helpers/price.js'

export default {
  name: 'MProductForm',
  components: {
    AButton,
    AInput,
    ATextArea,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  async mounted() {
    if (!this.isCreateProduct) {
      await this.$store.dispatch(`${FETCH_PRODUCT}`, this.$route.params.id)
      this.name.value = this.productItem?.name
      this.price.value = this.productItem?.price
      this.description = this.productItem?.description
      this.image = this.productItem?.image
    }
  },
  data() {
    return {
      name: {
        value: '',
        errorMessage: '',
      },
      price: {
        value: null,
        errorMessage: '',
      },
      description: '',
      image: '',
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    isCreateProduct: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      productItem: 'getProductResponse',
    }),
  },
  validations() {
    return {
      name: {
        value: {
          required,
        },
      },
      price: {
        value: {
          required,
          numeric,
        },
      },
    }
  },
  methods: {
    async submitProduct() {
      this.price.errorMessage = ''
      this.name.errorMessage = ''
      if (this.v$.$invalid) {
        this.name.errorMessage = this.v$.name.$silentErrors[0]?.$message
        this.price.errorMessage = this.v$.price.$silentErrors[0]?.$message
        return
      }
      this.isCreateProduct
        ? await this.$store.dispatch(`${CREATE_PRODUCT}`, {
            name: firstLetterToUppercase(this.name.value),
            price: formatPrice(this.price.value),
            description: this.description,
            image: this.image,
          })
        : await this.$store.dispatch(`${UPDATE_PRODUCT}`, {
            id: this.productItem.id,
            formData: {
              name: firstLetterToUppercase(this.name.value),
              price: formatPrice(this.price.value),
              description: this.description,
              image: this.image,
            },
          })
      this.$router.push({ path: '/admin/products' })
    },
  },
}
</script>
