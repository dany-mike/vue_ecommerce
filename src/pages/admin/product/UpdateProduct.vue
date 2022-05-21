<template>
  <MProductForm :title="'Update product'" />
</template>

<script>
import MProductForm from '@/components/molecules/m-product-form.vue'
export default {
  name: 'UpdateProduct',
  components: { MProductForm },
}
</script>
