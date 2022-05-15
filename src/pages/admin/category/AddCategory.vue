<template>
  <MCategoryForm :title="'Add category'" :fields="fields" :is-create-category="true" />
</template>

<script>
import MCategoryForm from '@/components/molecules/m-category-form.vue'
export default {
  name: 'AddCategory',
  components: {
    MCategoryForm,
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
          label: 'Image',
          errorMessage: '',
        },
      ],
    }
  },
}
</script>
