<template>
  <div class="m-product-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="validation-block">
      <div class="flex w-full justify-center items-center">
        <AinputAdmin :label="'Name'" v-model="name.value" />
      </div>
      <div class="flex w-full justify-center items-center">
        <p class="text-red-700 font-semibold">{{ name.errorMessage }}</p>
      </div>
    </div>
    <div class="validation-block">
      <div class="flex w-full justify-center items-center">
        <AinputAdmin :label="'Price(€)'" v-model="price.value" :type="'number'" />
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
    <div class="flex justify-center items-center mb-1">
      <p class="text-lg font-medium">Images</p>
    </div>
    <div class="flex w-full justify-center items-center">
      <v-select
        :options="formattedImages"
        class="w-1/4 my-2 bg-gray-200"
        v-model="selectedImage"
      ></v-select>
    </div>
    <div class="flex justify-center items-center mb-1">
      <p class="text-lg font-medium">Category product</p>
    </div>
    <div class="flex w-full justify-center items-center">
      <v-select
        :options="formattedCategories"
        class="w-1/4 my-2 bg-gray-200"
        v-model="selectedCategory"
      ></v-select>
    </div>
    <div class="flex justify-center items-center mt-2 w-full">
      <AButton @click="submitProduct" :classValue="'bg-indigo-500'">
        {{ isCreateProduct ? 'Add product' : 'Update product' }}
      </AButton>
    </div>
    <div>
      <router-link :to="'/admin/products'">
        <AButton class="ml-8" :classValue="'bg-red-500'">
          {{ 'Back' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import AinputAdmin from '@/components/atoms/a-input-admin.vue'
import ATextArea from '@/components/atoms/a-textarea.vue'
import { CREATE_PRODUCT, FETCH_PRODUCT, UPDATE_PRODUCT } from '@/store/modules/products/types'
import { FETCH_CATEGORIES } from '@/store/modules/categories/types'
import { mapGetters } from 'vuex'
import { required, numeric } from '@vuelidate/validators'
import { firstLetterToUppercase } from '@/helpers/format.js'
import { formatPrice } from '@/helpers/price.js'
import useVuelidate from '@vuelidate/core'
import { FETCH_IMAGES } from '@/store/modules/cloudinary/types'

export default {
  name: 'MProductForm',
  components: {
    AButton,
    AinputAdmin,
    ATextArea,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  async mounted() {
    await this.$store.dispatch(`${FETCH_CATEGORIES}`)
    await this.$store.dispatch(`${FETCH_IMAGES}`)
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
      selectedCategory: '',
      selectedImage: '',
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
      categories: 'getCategoryResponse',
      images: 'getImages',
    }),
    formattedCategories() {
      let formattedCategories = []
      this.categories.forEach((category) => {
        category = {
          ...category,
          label: category.name,
        }
        formattedCategories.push(category)
      })

      return formattedCategories
    },
    formattedImages() {
      let formattedImages = []

      console.log(this.images)

      this.images.forEach((image) => {
        image = {
          ...image,
          label: image.public_id,
        }
        formattedImages.push(image)
      })

      return formattedImages
    },
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

      const body = {
        name: firstLetterToUppercase(this.name.value),
        price: formatPrice(this.price.value),
        description: this.description,
        image: this.selectedImage.secure_url,
        categoryId: this.selectedCategory.id,
      }

      this.isCreateProduct
        ? await this.$store.dispatch(`${CREATE_PRODUCT}`, body)
        : await this.$store.dispatch(`${UPDATE_PRODUCT}`, {
            id: this.productItem.id,
            formData: body,
          })
      this.$router.push({ path: '/admin/products' })
    },
  },
}
</script>
