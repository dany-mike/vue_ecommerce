<template>
  <!-- TODO add error message at the bottom of the form -->
  <!-- TODO handle update category on the same form -->
  <!-- TODO add vuelidate -->
  <div class="m-category-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="flex w-full justify-center items-center">
      <AInput :label="'Name'" v-model="category.name" />
    </div>
    <div class="flex w-full justify-center items-center">
      <AInput :label="'Description'" v-model="category.description" />
    </div>
    <div class="flex w-full justify-center items-center">
      <AInput :label="'Image'" v-model="category.image" />
    </div>
    <div class="flex justify-center items-center mt-2">
      <AButton @click="submitCategory">
        {{ 'Submit' }}
      </AButton>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import AInput from '@/components/atoms/a-input.vue'

export default {
  name: 'MCategoryForm',
  components: {
    AButton,
    AInput,
  },
  data() {
    return {
      category: {
        name: '',
        description: '',
        image: '',
      },
      errorMessage: '',
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    submitCategory() {
      console.log('Submit category')
    },
  },
}
</script>
