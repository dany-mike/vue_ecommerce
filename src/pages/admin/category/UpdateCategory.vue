<template>
  <MCategoryForm :title="'Update category'" :fields="fields" :categoryItem="categoryItem" />
</template>

<script>
import MCategoryForm from '@/components/molecules/m-category-form.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'UpdateCategory',
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
  computed: {
    ...mapGetters({
      categoryItem: 'getCategoryResponse',
    }),
  },
}
</script>
