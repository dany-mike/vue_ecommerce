<template>
  <div class="product-page">
    <div class="bg-white">
      <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <MProductImage />
          <MProductInfo :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_PRODUCT } from '@/store/modules/products/types'
import MProductImage from '@/components/molecules/m-product-image.vue'
import MProductInfo from '@/components/molecules/m-product-info.vue'

export default {
  name: 'ProductPage',
  components: {
    MProductImage,
    MProductInfo,
  },
  data() {
    return {}
  },
  async mounted() {
    await this.$store.dispatch(`${FETCH_PRODUCT}`, this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      product: 'getProductResponse',
    }),
  },
}
</script>
