<template>
  <MCategoryForm :title="'Add category'" />
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
