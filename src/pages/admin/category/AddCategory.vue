<template>
  <MCategoryForm :title="'Add category'" :is-create-category="true" />
</template>

<script>
import MCategoryForm from '@/components/molecules/m-category-form.vue'
export default {
  name: 'AddCategory',
  components: {
    MCategoryForm,
  },
}
</script>
