<template>
  <div class="category-page lg:px-16 mt-12">
    <p class="text-4xl mb-8 pl-4 lg:pl-0">{{ categoryItem.name }}</p>
    <OListingProducts :products="products" v-if="products?.length > 0" />
    <p v-else class="text-medium pl-4 lg:pl-0">{{ categoryItem.name }} category coming soon !</p>
  </div>
</template>

<script>
import OListingProducts from '@/components/organisms/o-listing-products.vue'
import { mapGetters } from 'vuex'
import { FETCH_PRODUCTS_BY_CATEGORY } from '@/store/modules/products/types'
import { FETCH_CATEGORY_BY_NAME } from '@/store/modules/categories/types'
export default {
  name: 'CategoryPage',
  components: {
    OListingProducts,
  },
  async mounted() {
    this.scrollToTop()
    await this.$store.dispatch(`${FETCH_CATEGORY_BY_NAME}`, this.$route.params.categoryName)
    await this.$store.dispatch(`${FETCH_PRODUCTS_BY_CATEGORY}`, this.categoryItem?.id)
    if (Object.entries(this.categoryItem).length === 0) {
      this.$router.push('/')
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
  computed: {
    ...mapGetters({
      products: 'getProductsByCategory',
      categoryItem: 'getCategoryItem',
    }),
  },
}
</script>
