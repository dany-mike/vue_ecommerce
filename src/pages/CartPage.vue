<template>
  <div class="cart-page max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
    <form class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

        <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
          <MCartItems :cart-items="cart" @order-total="setOrderTotal" />
        </ul>
      </section>

      <!-- Order summary -->
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
            type="submit"
            class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            Checkout
          </button>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import MCartItems from '@/components/molecules/m-cart-items.vue'
import { mapGetters } from 'vuex'
export default {
  components: { MCartItems },
  name: 'CartPage',
  emits: ['order-total'],
  data() {
    return {
      orderTotal: '',
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart',
    }),
  },
  methods: {
    setOrderTotal(orderTotal) {
      this.orderTotal = orderTotal
    },
  },
}
</script>
