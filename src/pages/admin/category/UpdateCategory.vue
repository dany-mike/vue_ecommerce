<template>
  <MCategoryForm :title="'Update category'" />
</template>

<script>
import MCategoryForm from '@/components/molecules/m-category-form.vue'
export default {
  name: 'UpdateCategory',
  components: {
    MCategoryForm,
  },
}
</script>
