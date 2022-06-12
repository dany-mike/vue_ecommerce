<template>
  <div class="my-account max-w-2xl mx-auto pt-6 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <MAccountTabs @active-tab="setActiveTab" />
    <div class="profile-container" v-if="selectedTab === 'My profile'">
      <p class="text-2xl font-medium py-4">Update profile</p>
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="bg-white py-6 px-4 sm:p-6">
          <div class="mt-6 grid grid-cols-4 gap-6">
            <div class="col-span-4 sm:col-span-2">
              <label for="first-name" class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <input
                type="text"
                name="first-name"
                id="first-name"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              />
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label for="last-name" class="block text-sm font-medium text-gray-700"
                >Last name</label
              >
              <input
                type="text"
                name="last-name"
                id="last-name"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              />
            </div>

            <div class="col-span-4 sm:col-span-2">
              <label for="email-address" class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <input
                type="text"
                name="email-address"
                id="email-address"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              />
            </div>
            <div class="col-span-4 sm:col-span-2">
              <label for="email-address" class="block text-sm font-medium text-gray-700"
                >Enter your password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <div class="paswword-container" v-if="selectedTab === 'My password'">
      <p class="py-4">Update password</p>
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
