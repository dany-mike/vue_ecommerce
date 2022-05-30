<template>
  <div class="favorites lg:px-16 mt-12">
    <p class="text-4xl mb-8 pl-4 lg:pl-0">Favorites</p>
    <OListingProducts :products="wishlistProducts" :type="'wishlist'" />
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
    await this.$store.dispatch(`${FETCH_WISHLIST_PRODUCTS}`, this.user?.id)
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
    }),
  },
}
</script>
