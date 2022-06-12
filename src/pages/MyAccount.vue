<template>
  <div class="my-account max-w-2xl mx-auto pt-6 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <MAccountTabs @active-tab="setActiveTab" />
    <div class="profile-container" v-if="selectedTab === 'My profile'">
      <p class="font-medium pl-4">My profile</p>
    </div>
    <div class="wishlist-container" v-if="selectedTab === 'My wishlist'">
      <OListingProducts
        v-if="isWishlistProducts(wishlistProducts)"
        :products="wishlistProducts"
        :type="'wishlist'"
      />
      <p class="font-medium pl-4" v-else>You don't have favorites yet !</p>
    </div>
    <div class="addresses-container" v-if="selectedTab === 'My addresses'">
      <div class="my-4">
        <OAddressCarousel
          @o-address-carousel="setSelectedShippingAddress"
          :title="'Shipping addresses'"
          :addresses="shippingAddresses"
          :from="'my-account'"
          :type="'shipping'"
          :is-my-account="true"
        />
      </div>
      <router-link :to="`/add-address?type=shipping&from=my-account`" class="w-full">
        <AButton :classValue="'bg-indigo-600 hover:bg-indigo-700 w-full'"
          >Add shipping address</AButton
        >
      </router-link>
      <div class="my-4">
        <OAddressCarousel
          @o-address-carousel="setSelectedBillingAddress"
          :title="'Billing addresses'"
          :addresses="billingAddresses"
          :from="'my-account'"
          :type="'billing'"
          :is-my-account="true"
        />
      </div>
      <router-link :to="`/add-address?type=billing&from=my-account`" class="w-full">
        <AButton :classValue="'bg-indigo-600 hover:bg-indigo-700 w-full'"
          >Add billing address</AButton
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import MAccountTabs from '@/components/molecules/m-account-tabs.vue'
import OListingProducts from '@/components/organisms/o-listing-products.vue'
import AButton from '@/components/atoms/a-button.vue'
import OAddressCarousel from '@/components/organisms/o-address-carousel.vue'
import { mapGetters } from 'vuex'
import { FETCH_WISHLIST_PRODUCTS } from '@/store/modules/wishlist/types'
import {
  FETCH_USER_BILLING_ADDRESSES,
  FETCH_USER_SHIPPING_ADDRESSES,
} from '@/store/modules/address/types'
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
    await this.$store.dispatch(`${FETCH_USER_BILLING_ADDRESSES}`, this.user?.id)
    await this.$store.dispatch(`${FETCH_USER_SHIPPING_ADDRESSES}`, this.user?.id)
  },
  components: {
    MAccountTabs,
    OListingProducts,
    AButton,
    OAddressCarousel,
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
      billingAddresses: 'getBillingAddresses',
      shippingAddresses: 'getShippingAddresses',
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
