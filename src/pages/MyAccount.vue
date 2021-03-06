<template>
  <div class="my-account max-w-2xl mx-auto pt-6 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <MAccountTabs @active-tab="setActiveTab" />
    <div class="profile-container" v-if="selectedTab === 'My profile'">
      <MUpdateProfile v-if="dbUser" :user="dbUser" />
    </div>
    <div class="paswword-container" v-if="selectedTab === 'My password'">
      <MUpdatePassword v-if="dbUser" :user="dbUser" />
    </div>
    <div class="m-orders-list-container" v-if="selectedTab === 'My orders'">
      <MOrdersList
        v-if="dbUser && Object.entries(orderDetails).length === 0"
        :user="dbUser"
        :orders="orders"
        @m-orders-list="setOrderDetails"
      />
      <MOrderDetails
        @m-order-details="setOrdersList"
        v-if="Object.entries(orderDetails).length > 0"
        :item="orderDetails"
      />
    </div>
    <div class="wishlist-container" v-if="selectedTab === 'My wishlist'">
      <p class="text-2xl font-medium py-4">My wishlist</p>
      <OListingProducts
        @delete-wishlist-item="deleteWishlistItem"
        v-if="isWishlistProducts(wishlistProducts)"
        :products="wishlistProducts"
        :type="'wishlist'"
      />
      <p class="font-medium" v-else>You don't have favorites yet !</p>
    </div>
    <div class="addresses-container" v-if="selectedTab === 'My addresses'">
      <div class="my-4">
        <OAddressCarousel
          v-if="shippingAddresses && shippingAddresses?.length > 0"
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
          v-if="billingAddresses && billingAddresses?.length > 0"
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
import MOrdersList from '@/components/molecules/m-orders-list.vue'
import MOrderDetails from '@/components/molecules/m-order-details.vue'
import OListingProducts from '@/components/organisms/o-listing-products.vue'
import MUpdatePassword from '@/components/molecules/m-update-password.vue'
import MUpdateProfile from '@/components/molecules/m-update-profile.vue'
import AButton from '@/components/atoms/a-button.vue'
import OAddressCarousel from '@/components/organisms/o-address-carousel.vue'
import { mapGetters } from 'vuex'
import {
  AFTER_DELETE_WISHLIST_PRODUCT,
  FETCH_WISHLIST_PRODUCTS,
} from '@/store/modules/wishlist/types'
import {
  FETCH_USER_BILLING_ADDRESSES,
  FETCH_USER_SHIPPING_ADDRESSES,
} from '@/store/modules/address/types'
import { FETCH_USER_BY_ID } from '@/store/modules/auth/types'
import {
  CLEAR_ORDER_DETAILS,
  FETCH_ORDER_SUMMARY,
  FETCH_USER_ORDERS,
} from '@/store/modules/order/types'
export default {
  name: 'MyAccount',
  components: {
    MAccountTabs,
    OListingProducts,
    AButton,
    OAddressCarousel,
    MUpdatePassword,
    MUpdateProfile,
    MOrdersList,
    MOrderDetails,
  },
  data() {
    return {
      selectedTab: 'My profile',
    }
  },
  async mounted() {
    this.scrollToTop()
    this.$store.dispatch(CLEAR_ORDER_DETAILS)
    await this.$store.dispatch(`${FETCH_USER_BY_ID}`, this.user?.id)

    if (!this.user) {
      this.$router.push({ path: '/signin', query: { type: 'my-account' } })
    }
    await this.$store.dispatch(`${FETCH_WISHLIST_PRODUCTS}`, this.user?.id)
    await this.$store.dispatch(`${FETCH_USER_BILLING_ADDRESSES}`, this.user?.id)
    await this.$store.dispatch(`${FETCH_USER_SHIPPING_ADDRESSES}`, this.user?.id)
    await this.$store.dispatch(FETCH_USER_ORDERS, this.user?.accessToken)
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
      billingAddresses: 'getBillingAddresses',
      shippingAddresses: 'getShippingAddresses',
      dbUser: 'getDbUser',
      orders: 'getUserOrders',
      orderDetails: 'getOrderSummary',
    }),
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    deleteWishlistItem(product) {
      this.$store.dispatch(AFTER_DELETE_WISHLIST_PRODUCT, {
        products: this.wishlistProducts,
        product,
      })
    },
    isWishlistProducts(products) {
      if (products.length > 0) {
        return true
      }
      return false
    },
    setActiveTab(tab) {
      this.selectedTab = tab.name
    },
    async setOrderDetails(item) {
      await this.$store.dispatch(FETCH_ORDER_SUMMARY, item.id)
    },

    setOrdersList() {
      this.$store.dispatch(CLEAR_ORDER_DETAILS)
    },
  },
}
</script>
