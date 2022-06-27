<template>
  <div class="bg-gray-50">
    <div class="max-w-2xl mx-auto pt-6 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <p class="text-3xl font-bold">Checkout page</p>
      <h2 class="sr-only">Checkout</h2>
      <div>
        <div class="my-4">
          <OAddressCarousel
            @o-address-carousel="setSelectedShippingAddress"
            v-if="shippingAddresses && shippingAddresses?.length > 0"
            :title="'Shipping addresses'"
            :addresses="shippingAddresses"
            :from="'checkout'"
            :type="'shipping'"
          />
        </div>
        <router-link
          :to="`/add-address?type=shipping&from=checkout&orderId=${orderId}`"
          class="w-full"
        >
          <AButton :classValue="'bg-indigo-600 hover:bg-indigo-700 w-full'"
            >Add shipping address</AButton
          >
        </router-link>
        <div class="my-4">
          <OAddressCarousel
            v-if="billingAddresses && billingAddresses?.length > 0"
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
      <div class="mt-4" v-if="selectedBillingAddress.value || selectedShippingAddress.value">
        <p class="text-2xl font-medium">Selected addresses</p>
        <div class="pt-2 lg:pt-4 mb-2 lg:mb-4">
          <p class="text-xl font-medium" v-if="selectedShippingAddress.value">
            Selected shipping address:
          </p>
          <MAddressCard
            :type="'shipping'"
            :from="'checkout'"
            :item="selectedShippingAddress.value"
            :is-selected="true"
          />
        </div>
        <div class="mt-2 mb-2">
          <p class="text-xl font-medium" v-if="selectedBillingAddress">Selected billing address:</p>
          <MAddressCard
            :type="'billing'"
            :from="'checkout'"
            :item="selectedBillingAddress.value"
            :is-selected="true"
          />
        </div>
      </div>
      <div class="err-message-container lg:hidden">
        <p
          v-if="selectedShippingAddress.errMsg && !selectedShippingAddress.value"
          class="text-red-700 font-semibold hidden lg:block"
        >
          Shipping address {{ selectedShippingAddress.errMsg.toLowerCase() }}
        </p>
        <p
          v-if="selectedBillingAddress.errMsg && !selectedBillingAddress.value"
          class="text-red-700 font-semibold hidden lg:block"
        >
          Billing address {{ selectedBillingAddress.errMsg.toLowerCase() }}
        </p>
      </div>
      <MCheckoutOrderSummary
        :user="user"
        :order-summary="orderSummary"
        :items="orderSummary?.orderItems"
        :shipping-address-id="shippingAddressId"
        :billing-address-id="billingAddressId"
        :vuelidate="v$"
        :billingAddressErr="selectedBillingAddress.errMsg"
        :shippingAddressErr="selectedShippingAddress.errMsg"
        @shipping-address-error="setShippingAddressError"
        @billing-address-error="setBillingAddressError"
      />
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import OAddressCarousel from '@/components/organisms/o-address-carousel.vue'
import MCheckoutOrderSummary from '@/components/molecules/m-checkout-order-summary.vue'
import MAddressCard from '@/components/molecules/m-address-card.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import {
  FETCH_USER_BILLING_ADDRESSES,
  FETCH_USER_SHIPPING_ADDRESSES,
} from '@/store/modules/address/types'
import { mapGetters } from 'vuex'
import { FETCH_ORDER_SUMMARY } from '@/store/modules/order/types'
export default {
  name: 'CheckoutPage',
  components: {
    OAddressCarousel,
    AButton,
    MCheckoutOrderSummary,
    MAddressCard,
  },
  async mounted() {
    this.scrollToTop()
    await this.$store.dispatch(`${FETCH_ORDER_SUMMARY}`, this.$route.params.id)
    await this.$store.dispatch(`${FETCH_USER_BILLING_ADDRESSES}`, this.user?.id)
    await this.$store.dispatch(`${FETCH_USER_SHIPPING_ADDRESSES}`, this.user?.id)
    if (!this.user) {
      this.$router.push('/cart')
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      selectedShippingAddress: {
        value: null,
        errMsg: '',
      },
      selectedBillingAddress: {
        value: null,
        errMsg: '',
      },
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    setBillingAddressError(errMsg) {
      this.selectedBillingAddress.errMsg = errMsg
    },
    setShippingAddressError(errMsg) {
      this.selectedShippingAddress.errMsg = errMsg
    },
    setSelectedShippingAddress(address) {
      this.selectedShippingAddress.value = address
      this.$toast.show('Shipping address selected')
    },
    setSelectedBillingAddress(address) {
      this.selectedBillingAddress.value = address
      this.$toast.show('Billing address selected')
    },
  },
  validations() {
    return {
      selectedShippingAddress: {
        value: {
          required,
        },
      },
      selectedBillingAddress: {
        value: {
          required,
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
      billingAddresses: 'getBillingAddresses',
      shippingAddresses: 'getShippingAddresses',
      orderSummary: 'getOrderSummary',
    }),
    orderId() {
      return this.$route.params.id
    },
    shippingAddressId() {
      return this.selectedShippingAddress.value?.id
    },
    billingAddressId() {
      return this.selectedBillingAddress.value?.id
    },
  },
}
</script>
