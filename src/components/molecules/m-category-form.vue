<template>
  <!-- TODO add vuelidate -->
  <!-- TODO add error message at each field of the form -->
  <div class="m-category-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="flex w-full justify-center items-center">
      <AInput :label="'Name'" v-model="categoryName" />
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

export default {
  name: 'MCategoryForm',
  components: {
    AButton,
    AInput,
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
  methods: {
    // TODO add method in an helper folder
    firstLetterToUppercase(string) {
      return string.replace(/\b\w/g, (c) => c.toUpperCase())
    },
    async submitCategory() {
      this.isCreateCategory
        ? await this.$store.dispatch(`${CREATE_CATEGORY}`, {
            name: this.firstLetterToUppercase(this.categoryName),
            image: this.image,
          })
        : await this.$store.dispatch(`${UPDATE_CATEGORY}`, {
            id: this.categoryItem.id,
            formData: {
              name: this.firstLetterToUppercase(this.categoryName),
              image: this.image,
            },
          })
      this.$router.push({ path: '/admin/category' })
    },
  },
}
</script>
