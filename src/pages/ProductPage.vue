<template>
  <div class="product-page">
    {{ product }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_PRODUCT } from '@/store/modules/products/types'
export default {
  name: 'ProductPage',
  components: {},
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
