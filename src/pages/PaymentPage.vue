<template>
  <!-- TODO: Optimize Payment Gateway page on v2 -->
  <div class="payment-page bg-gray-200 h-screen">
    <div class="flex justify-center items-center bg-gray-200 px-5 pb-0 pt-24">
      <div class="rounded-md bg-yellow-50 p-4 warning-card">
        <div class="flex">
          <div class="flex-shrink-0">
            <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">Attention needed</h3>
            <div class="mt-2 text-sm text-yellow-700">
              <p>
                This site is a mock-ecommerce website. You can only do mock orders. Please enter the
                card number 4242 4242 4242 4242, enter the CVC 123, enter the date 12/34 and a valid
                postal code like 75001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 flex items-center justify-center px-5 py-8">
      <div
        class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
        style="max-width: 600px"
      >
        <div class="mb-10">
          <h1 class="text-center font-bold text-xl uppercase">Credit card payment</h1>
        </div>
        <div class="mb-3 flex -mx-2">
          <div class="px-2">
            <label for="type1" class="flex items-center cursor-pointer">
              <img
                src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                class="h-8 ml-3"
              />
            </label>
          </div>
        </div>
        <div class="mb-3">
          <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
          <div>
            <input
              class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="John Smith"
              type="text"
              v-model="cardName"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="font-bold text-sm mb-2 ml-1 flex">Card number</label>
          <div id="stripe-element-mount-point" />
        </div>
        <div class="mb-3 -mx-2 flex items-end">
          <div class="px-2 w-1/2">
            <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
            <div>
              <select
                class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="01">01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>
          </div>
          <div class="px-2 w-1/2">
            <select
              class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
        </div>
        <div class="flex w-full justify-center items-center">
          <p v-if="errorMessage" class="text-red-700 font-semibold">{{ errorMessage?.message }}</p>
        </div>
        <div class="flex items-center justify-center w-full">
          <button
            @click="handleSubmit"
            :disabled="!isComplete || !cardName || errorMessage?.message"
            :class="{
              'bg-indigo-300': !isComplete || !cardName || errorMessage?.message,
              'hover:bg-indigo-700 focus:bg-indigo-700 bg-indigo-500':
                isComplete && cardName && !errorMessage,
            }"
            class="block w-full mx-auto text-white rounded-lg px-3 py-3 font-semibold mt-6"
          >
            <span class="mdi mdi-lock-outline mr-1 text-white">PAY {{ totalPrice }}€ </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CREATE_PAYMENT_INTENT, ELEMENT_TYPE } from '@/store/modules/payment/types'
import { mapGetters } from 'vuex'
import { loadStripe } from '@stripe/stripe-js'
import { formatPrice } from '@/helpers/price'
import { FETCH_ORDER_SUMMARY, PAY_ORDER } from '@/store/modules/order/types'
import { SEND_INVOICE } from '@/store/modules/email/types'
import { CLEAR_CART, GET_CART_ITEM_COUNT } from '@/store/modules/cart/types'
import { DELETE_WISHLIST_PRODUCT, FETCH_WISHLIST_PRODUCTS } from '@/store/modules/wishlist/types'
import { ExclamationIcon } from '@heroicons/vue/solid'

export default {
  name: 'PaymentPage',
  components: {
    ExclamationIcon,
  },
  data() {
    return {
      stripe: null,
      cardName: null,
      elements: null,
      errorMessage: null,
      isComplete: false,
    }
  },
  async mounted() {
    this.scrollToTop()
    await this.$store.dispatch(`${FETCH_WISHLIST_PRODUCTS}`, this.user?.id)
    await this.$store.dispatch(FETCH_ORDER_SUMMARY, this.$route.params.orderId)

    if (this.orderSummary.status === 'COMPLETE') {
      this.stripe = await loadStripe(`${process.env.VUE_APP_STRIPE_KEY}`)
      const body = {
        orderId: Number(this.$route.params.orderId),
        userToken: this.user.accessToken,
      }
      this.elements = this.stripe.elements()
      const element = this.elements.create(ELEMENT_TYPE)
      element.mount('#stripe-element-mount-point')
      const cardElement = this.elements.getElement(ELEMENT_TYPE)
      cardElement.on('change', (event) => {
        this.errorMessage = ''
        this.isComplete = false
        if (event.complete) {
          this.isComplete = event.complete
        } else if (event.error) {
          this.errorMessage = event.error
        }
      })

      await this.$store.dispatch(CREATE_PAYMENT_INTENT, body)
    } else {
      this.$router.push(`/checkout/${this.$route.params.orderId}`)
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    async handleSubmit() {
      let loader = this.$loading.show()

      const cardElement = this.elements.getElement(ELEMENT_TYPE)

      const paymentMethodReq = await this.stripe.createPaymentMethod({
        type: ELEMENT_TYPE,
        card: cardElement,
        // TODO: add additionnals information in this object on v2
        billing_details: {
          name: this.cardName,
          email: this.user.email,
          address: {
            city: this.orderSummary.billingAddress.city,
            country: this.orderSummary.billingAddress.countryCode,
            line1: `${this.orderSummary.billingAddress.streetNumber} ${this.orderSummary.billingAddress.streetName}`,
            postal_code: this.orderSummary.billingAddress.postalCode,
          },
        },
      })

      const { error } = await this.stripe.confirmCardPayment(this.paymentIntent.client_secret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      })

      if (error) return

      await this.$store.dispatch(PAY_ORDER, {
        orderId: Number(this.$route.params.orderId),
        userToken: this.user.accessToken,
      })

      loader.hide()

      await this.$store.dispatch(SEND_INVOICE, {
        userToken: this.user?.accessToken,
        orderId: Number(this.$route.params.orderId),
        orderItemsDto: this.orderSummary.orderItems,
      })

      if (this.wishlistProducts.length > 0) {
        this.wishlistProducts.forEach((wishlistProduct) => {
          this.cart.forEach((item) => {
            if (wishlistProduct.id === item.id) {
              this.$store.dispatch(DELETE_WISHLIST_PRODUCT, {
                userId: this.user?.id,
                productId: wishlistProduct.id,
              })
            }
          })
        })
      }

      this.$store.dispatch(CLEAR_CART)

      this.$store.dispatch(GET_CART_ITEM_COUNT, this.cart?.length)

      this.$router.push(`/success/${this.$route.params.orderId}`)
    },
  },
  computed: {
    ...mapGetters({
      paymentIntent: 'getPaymentIntent',
      user: 'getCurrentUser',
      orderSummary: 'getOrderSummary',
      cart: 'getCart',
      wishlistProducts: 'getWishlistResponse',
    }),
    totalPrice() {
      return formatPrice(this.paymentIntent.amount / 100)
    },
  },
}
</script>

<style scoped>
.warning-card {
  max-width: 600px;
}
</style>
