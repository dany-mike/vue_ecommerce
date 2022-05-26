<template>
  <div class="category-page lg:px-16">
    <OListingProducts :products="products" />
  </div>
</template>

<script>
import OListingProducts from '@/components/organisms/o-listing-products.vue'
import { mapGetters } from 'vuex'
import { FETCH_PRODUCTS_BY_CATEGORY } from '@/store/modules/products/types'
export default {
  name: 'CategoryPage',
  components: {
    OListingProducts,
  },
  mounted() {
    this.$store.dispatch(`${FETCH_PRODUCTS_BY_CATEGORY}`, this.$route.params.categoryId)
  },
  computed: {
    ...mapGetters({
      products: 'getProductResponse',
    }),
  },
}
</script>
