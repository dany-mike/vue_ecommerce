<template>
  <!-- TODO: Optimize Payment Gateway page on v2 -->
  <div
    class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16"
  >
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
      <div>
        <button
          @click="handleSubmit"
          class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold mt-6"
        >
          <i class="mdi mdi-lock-outline mr-1"></i> PAY {{ totalPrice }}€
        </button>
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
import { FETCH_WISHLIST_PRODUCTS } from '@/store/modules/wishlist/types'
export default {
  name: 'PaymentPage',
  data() {
    return {
      stripe: null,
      cardName: null,
      elements: null,
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

      // TODO: add logic
      // wishlistProducts.forEach((product) => {
      //   cartItems.forEach((item) => {
      //     if (product.id === item.id) {
      //       console.log(product.name);
      //     }
      //   });
      // });

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
      wishlistProductts: 'getWishlistResponse',
    }),
    totalPrice() {
      return formatPrice(this.paymentIntent.amount / 100)
    },
  },
}
</script>
