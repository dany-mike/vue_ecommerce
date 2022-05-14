<template>
  <!-- TODO add vuelidate -->
  <!-- TODO add error message at the bottom of the form -->
  <!-- TODO handle update category on the same form -->
  <div class="m-category-form mt-8">
    <div class="flex w-full justify-center items-center">
      <p class="font-bold text-4xl">{{ title }}</p>
    </div>
    <div class="flex w-full justify-center items-center" :key="field.label" v-for="field in fields">
      <AInput :label="field.label" v-model="field.value" />
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
      fields: [
        {
          value: '',
          label: 'Name',
          errorMessage: '',
        },
        {
          value: '',
          label: 'Description',
          errorMessage: '',
        },
        {
          value: '',
          label: 'Image',
          errorMessage: '',
        },
      ],
    }
  },
  props: {
    // TODO: add props for UpdateCategory page
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
