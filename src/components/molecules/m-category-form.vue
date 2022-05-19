<template>
  <!-- TODO add vuelidate -->
  <!-- TODO add error message at the bottom of the form -->
  <!-- TODO handle text area case create textarea dynamic component and add v-if in the loops -->
  <div class="m-category-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="flex w-full justify-center items-center" :key="field.label" v-for="field in fields">
      <AInput :label="field.label" v-model="field.value" />
    </div>
    <div class="flex justify-center items-center mt-2 w-full">
      <AButton @click="submitCategory">
        {{ 'Submit' }}
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

export default {
  name: 'MCategoryForm',
  components: {
    AButton,
    AInput,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
    },
    categoryItem: {
      type: Object,
      default: () => {},
    },
    isCreateCategory: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // TODO add method an helper folder
    firstLetterToUppercase(string) {
      return string.replace(/\b\w/g, (c) => c.toUpperCase())
    },
    async submitCategory() {
      this.isCreateCategory
        ? await this.$store.dispatch(`${CREATE_CATEGORY}`, {
            name: this.firstLetterToUppercase(this.fields[0].value),
            image: this.fields[1].value,
          })
        : await this.$store.dispatch(`${UPDATE_CATEGORY}`, {
            id: this.categoryItem.id,
            formData: {
              name: this.firstLetterToUppercase(this.fields[0].value),
              image: this.fields[1].value,
            },
          })
      this.$router.push({ path: '/admin/category' })
    },
  },
}
</script>
