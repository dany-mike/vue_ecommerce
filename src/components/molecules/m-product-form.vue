<template>
  <div class="m-product-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="validation-block">
      <div class="flex w-full justify-center items-center">
        <AInput :label="'Name'" v-model="productName" />
      </div>
      <div class="flex w-full justify-center items-center">
        <p class="text-red-700 font-semibold">{{ errorMessage }}</p>
      </div>
    </div>
    <div class="flex w-full justify-center items-center">
      <!-- TODO Create text area component for description-->
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
// import { UPDATE_CATEGORY, CREATE_CATEGORY } from '@/store/modules/categories/types'
// import { FETCH_CATEGORY } from '@/store/modules/categories/types'
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// import { firstLetterToUppercase } from '@/helpers/format.js'

export default {
  name: 'MProductForm',
  components: {
    AButton,
    AInput,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  async mounted() {
    // if (!this.isCreateCategory) {
    //   await this.$store.dispatch(`${FETCH_CATEGORY}`, this.$route.params.id)
    //   this.categoryName = this.categoryItem?.name
    //   this.image = this.categoryItem?.image
    // }
  },
  data() {
    return {
      productName: '',
      image: '',
      errorMessage: '',
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
      productName: { required },
    }
  },
  methods: {
    async submitProduct() {
      console.log('SUBMIT product')
      //   if (this.v$.$invalid) {
      //     this.errorMessage = this.v$.$silentErrors[0].$message
      //     return
      //   }
      //   this.isCreateProduct
      //     ? await this.$store.dispatch(`${CREATE_CATEGORY}`, {
      //         name: firstLetterToUppercase(this.categoryName),
      //         image: this.image,
      //       })
      //     : await this.$store.dispatch(`${UPDATE_CATEGORY}`, {
      //         id: this.categoryItem.id,
      //         formData: {
      //           name: firstLetterToUppercase(this.categoryName),
      //           image: this.image,
      //         },
      //       })
      //   this.$router.push({ path: '/admin/product' })
    },
  },
}
</script>
