<template>
  <div class="favorites lg:px-16 mt-12">
    <p class="text-4xl mb-8 pl-4 lg:pl-0">Favorites</p>
    <OListingProducts
      v-if="isWishlistProducts(wishlistProducts)"
      :products="wishlistProducts"
      :type="'wishlist'"
    />
    <p class="font-medium pl-4" v-else>You don't have favorites yet !</p>
  </div>
</template>

<script>
import OListingProducts from '@/components/organisms/o-listing-products.vue'
import { mapGetters } from 'vuex'
import { FETCH_WISHLIST_PRODUCTS } from '@/store/modules/wishlist/types'
export default {
  name: 'FavoritesPage',
  components: {
    OListingProducts,
  },
  async mounted() {
    if (!this.user) {
      this.$router.push({ path: '/signin', query: { type: 'wishlist' } })
    }
    await this.$store.dispatch(`${FETCH_WISHLIST_PRODUCTS}`, this.user?.id)
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
    }),
  },
  methods: {
    isWishlistProducts(products) {
      if (products?.length > 0) {
        return true
      }
      return false
    },
  },
}
</script>
