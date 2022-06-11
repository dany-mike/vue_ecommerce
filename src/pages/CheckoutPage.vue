<template>
  <div class="bg-gray-50">
    <div class="max-w-2xl mx-auto pt-6 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <p class="text-3xl font-bold">Checkout page</p>
      <h2 class="sr-only">Checkout</h2>
      <div>
        <div class="my-4">
          <OAddressCarousel
            @o-address-carousel="setSelectedShippingAddress"
            :title="'Shipping addresses'"
            :addresses="shippingAddresses"
            :from="'checkout'"
            :type="'shipping'"
          />
        </div>
        <router-link :to="`/add-address?type=shipping&from=checkout`" class="w-full">
          <AButton :classValue="'bg-indigo-600 hover:bg-indigo-700 w-full'"
            >Add shipping address</AButton
          >
        </router-link>
        <div class="my-4">
          <OAddressCarousel
            @o-address-carousel="setSelectedBillingAddress"
            :title="'Billing addresses'"
            :addresses="billingAddresses"
            :from="'checkout'"
            :type="'billing'"
          />
        </div>
        <router-link
          :to="`/add-address?type=billing&from=checkout&orderId=${orderId}`"
          class="w-full"
        >
          <AButton :classValue="'bg-indigo-600 hover:bg-indigo-700 w-full'"
            >Add billing address</AButton
          >
        </router-link>
        <!-- TODO: add feature in v2 -->
        <!-- <div class="same-as-shipping mt-4 mb-8 flex">
          <div class="relative flex items-start">
            <div class="flex items-center h-5">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            Add this feature in v2
            <div class="ml-3 text-sm">
              <label for="comments" class="font-medium text-gray-700"
                >Same billing address as shipping</label
              >
            </div>
          </div>
        </div> -->
      </div>
      <div class="mt-4" v-if="selectedBillingAddress || selectedShippingAddress">
        <p class="text-2xl font-medium">Selected addresses</p>
        <div>
          <p class="text-xl font-medium" v-if="selectedShippingAddress">
            Selected shipping address:
          </p>
          <MAddressCard
            :type="'shipping'"
            :from="'checkout'"
            :item="selectedShippingAddress"
            :is-selected="true"
          />
        </div>
        <div>
          <p class="text-xl font-medium" v-if="selectedBillingAddress">Selected billing address:</p>
          <MAddressCard
            :type="'billing'"
            :from="'checkout'"
            :item="selectedBillingAddress"
            :is-selected="true"
          />
        </div>
      </div>
      <MCheckoutOrderSummary :user="user" />
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import OAddressCarousel from '@/components/organisms/o-address-carousel.vue'
import MCheckoutOrderSummary from '@/components/molecules/m-checkout-order-summary.vue'
import MAddressCard from '@/components/molecules/m-address-card.vue'

import {
  FETCH_USER_BILLING_ADDRESSES,
  FETCH_USER_SHIPPING_ADDRESSES,
} from '@/store/modules/address/types'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckoutPage',
  components: {
    OAddressCarousel,
    AButton,
    MCheckoutOrderSummary,
    MAddressCard,
  },
  async mounted() {
    await this.$store.dispatch(`${FETCH_USER_BILLING_ADDRESSES}`, this.user?.id)
    await this.$store.dispatch(`${FETCH_USER_SHIPPING_ADDRESSES}`, this.user?.id)
    if (!this.user) {
      this.$router.push('/cart')
    }
  },
  data() {
    return {
      selectedShippingAddress: null,
      selectedBillingAddress: null,
    }
  },
  methods: {
    setSelectedShippingAddress(address) {
      this.selectedShippingAddress = address
      this.$toast.show('Shipping address selected')
    },
    setSelectedBillingAddress(address) {
      this.selectedBillingAddress = address
      this.$toast.show('Billing address selected')
    },
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
      billingAddresses: 'getBillingAddresses',
      shippingAddresses: 'getShippingAddresses',
    }),
    orderId() {
      return this.$route.params.id
    },
  },
}
</script>
