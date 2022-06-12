<template>
  <div class="my-account max-w-2xl mx-auto pt-6 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <MAccountTabs @active-tab="setActiveTab" />
    <div class="wishlist-container" v-if="selectedTab === 'My wishlist'">
      <OListingProducts
        v-if="isWishlistProducts(wishlistProducts)"
        :products="wishlistProducts"
        :type="'wishlist'"
      />
      <p class="font-medium pl-4" v-else>You don't have favorites yet !</p>
    </div>
  </div>
</template>

<script>
import MAccountTabs from '@/components/molecules/m-account-tabs.vue'
import OListingProducts from '@/components/organisms/o-listing-products.vue'
import { mapGetters } from 'vuex'
import { FETCH_WISHLIST_PRODUCTS } from '@/store/modules/wishlist/types'
export default {
  name: 'MyAccount',
  data() {
    return {
      selectedTab: 'My profile',
    }
  },
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
    setActiveTab(tab) {
      this.selectedTab = tab.name
    },
  },
}
</script>
