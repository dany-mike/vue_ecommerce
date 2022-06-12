<template>
  <div class="my-account">
    <MAccountTabs />
    <OListingProducts
      v-if="isWishlistProducts(wishlistProducts)"
      :products="wishlistProducts"
      :type="'wishlist'"
    />
  </div>
</template>

<script>
import MAccountTabs from '@/components/molecules/m-account-tabs.vue'
import OListingProducts from '@/components/organisms/o-listing-products.vue'
import { mapGetters } from 'vuex'
import { FETCH_WISHLIST_PRODUCTS } from '@/store/modules/wishlist/types'
export default {
  name: 'MyAccount',
  async mounted() {
    if (!this.user) {
      this.$router.push({ path: '/signin', query: { type: 'my-account' } })
    }
    await this.$store.dispatch(`${FETCH_WISHLIST_PRODUCTS}`, this.user?.id)
  },
  components: {
    MAccountTabs,
    OListingProducts,
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
    }),
  },
  methods: {
    isWishlistProducts(products) {
      if (products.length > 0) {
        return true
      }
      return false
    },
  },
}
</script>
