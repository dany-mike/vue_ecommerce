<template>
  <section
    aria-labelledby="summary-heading"
    class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
  >
    <dl class="mt-6 space-y-4">
      <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
        <dt class="text-base font-medium text-gray-900">Order total</dt>
        <dd class="text-base font-medium text-gray-900">{{ orderTotal }}€</dd>
      </div>
    </dl>

    <div class="mt-6">
      <button
        @click="onSubmit"
        class="w-full bg-indigo-600 cursor-pointer border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
      >
        Checkout
      </button>
    </div>
  </section>
</template>

<script>
import { CREATE_ORDER } from '@/store/modules/order/types'
import { mapGetters } from 'vuex'
export default {
  name: 'MOrderSummary',
  props: {
    orderTotal: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Object,
      default: () => {},
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async onSubmit() {
      if (this.user?.role !== 'user') {
        this.$router.push({ path: '/signin', query: { type: 'checkout' } })
      }

      if (this.user?.role === 'user') {
        const body = {
          orderItems: this.cart,
          status: 'CREATED',
          userToken: this.user?.accessToken,
        }
        await this.$store.dispatch(CREATE_ORDER, body)
        this.$router.push(`/checkout/${this.order.id}`)
      }
    },
  },
  computed: {
    ...mapGetters({
      order: 'getOrderResponse',
      user: 'getCurrentUser',
    }),
  },
}
</script>
