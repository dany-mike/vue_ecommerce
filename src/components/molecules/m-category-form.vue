<template>
  <div class="m-category-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="validation-block">
      <div class="flex w-full justify-center items-center">
        <AInput :label="'Name'" v-model="categoryName" />
      </div>
      <div class="flex w-full justify-center items-center">
        <p class="text-red-700 font-semibold">{{ errorMessage }}</p>
      </div>
    </div>
    <div class="flex w-full justify-center items-center">
      <AInput :label="'Image'" v-model="image" />
    </div>
    <div class="flex justify-center items-center mt-2 w-full">
      <AButton @click="submitCategory">
        {{ isCreateCategory ? 'Add category' : 'Update category' }}
      </AButton>
    </div>
    <div>
      <router-link :to="'/admin/category'">
        <AButton class="ml-8">
          {{ 'Back' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import AInput from '@/components/atoms/a-input.vue'
import { UPDATE_CATEGORY, CREATE_CATEGORY } from '@/store/modules/categories/types'
import { FETCH_CATEGORY } from '@/store/modules/categories/types'
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { firstLetterToUppercase } from '@/helpers/format.js'

export default {
  name: 'MCategoryForm',
  components: {
    AButton,
    AInput,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  async mounted() {
    if (!this.isCreateCategory) {
      await this.$store.dispatch(`${FETCH_CATEGORY}`, this.$route.params.id)
      this.categoryName = this.categoryItem?.name
      this.image = this.categoryItem?.image
    }
  },
  data() {
    return {
      categoryName: '',
      image: '',
      errorMessage: '',
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    isCreateCategory: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      categoryItem: 'getCategoryResponse',
    }),
  },
  validations() {
    return {
      categoryName: { required },
    }
  },
  methods: {
    async submitCategory() {
      if (this.v$.$invalid) {
        this.errorMessage = this.v$.$silentErrors[0].$message
        return
      }
      this.isCreateCategory
        ? await this.$store.dispatch(`${CREATE_CATEGORY}`, {
            name: firstLetterToUppercase(this.categoryName),
            image: this.image,
          })
        : await this.$store.dispatch(`${UPDATE_CATEGORY}`, {
            id: this.categoryItem.id,
            formData: {
              name: firstLetterToUppercase(this.categoryName),
              image: this.image,
            },
          })
      this.$router.push({ path: '/admin/category' })
    },
  },
}
</script>
