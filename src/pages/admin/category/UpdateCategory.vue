<template>
  <MCategoryForm :title="'Update category'" :fields="formattedFields" />
</template>

<script>
import MCategoryForm from '@/components/molecules/m-category-form.vue'
import { mapGetters } from 'vuex'
import { FETCH_CATEGORY } from '@/store/modules/categories/types'
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
          label: 'Image',
          errorMessage: '',
        },
      ],
    }
  },
  async mounted() {
    await this.$store.dispatch(`${FETCH_CATEGORY}`, this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      categoryItem: 'getCategoryResponse',
    }),
    formattedFields() {
      const fields = {
        ...this.$data.fields,
      }
      fields[0].value = this.categoryItem.name
      fields[1].value = this.categoryItem.image
      return fields
    },
  },
}
</script>
