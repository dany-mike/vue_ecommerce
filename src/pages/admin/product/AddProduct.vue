<template>
  <div>
    <MProductForm :title="'Add product'" :is-create-product="true" />
  </div>
</template>

<script>
import MProductForm from '@/components/molecules/m-product-form.vue'
export default {
  name: 'MCategoryProduct',
  components: { MProductForm },
}
</script>
