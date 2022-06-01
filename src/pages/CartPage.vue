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
      <MOrderSummary :orderTotal="orderTotal" />
    </form>
  </div>
</template>

<script>
import MCartItems from '@/components/molecules/m-cart-items.vue'
import MOrderSummary from '@/components/molecules/m-order-summary.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    MCartItems,
    MOrderSummary,
  },
  name: 'CartPage',
  emits: ['order-total'],
  data() {
    return {
      orderTotal: 0,
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
