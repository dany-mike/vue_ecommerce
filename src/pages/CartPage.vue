<template>
  <div class="cart-page max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      Shopping Cart {{ isEmpty }}
    </h1>
    <div
      v-if="isEmpty"
      :class="{
        'mt-8': isEmpty,
      }"
    >
      <router-link :to="'/'" class="w-full">
        <AButton :classValue="'bg-indigo-600 hover:bg-indigo-700 w-full'">Back to home</AButton>
      </router-link>
    </div>
    <form
      class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
      v-if="!isEmpty"
    >
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
        <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
          <MCartItems :cart-items="cart" @order-total="setOrderTotal" />
        </ul>
      </section>
      <MOrderSummary :orderTotal="orderTotal" :cart="cart" />
    </form>
  </div>
</template>

<script>
import MCartItems from '@/components/molecules/m-cart-items.vue'
import MOrderSummary from '@/components/molecules/m-order-summary.vue'
import AButton from '@/components/atoms/a-button.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    MCartItems,
    MOrderSummary,
    AButton,
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
    isEmpty() {
      return this.cart.length === 0 ? 'empty' : ''
    },
  },
  methods: {
    setOrderTotal(orderTotal) {
      this.orderTotal = orderTotal
    },
  },
}
</script>
