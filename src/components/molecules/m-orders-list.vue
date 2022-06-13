<template>
  <div
    class="m-orders-list w-full mt-10 block p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    v-for="order in fOrders"
    :key="order.id"
  >
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium dark:text-white" :style="{ color: order.color }">{{
        order.status
      }}</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        class="h-2.5 rounded-full"
        :style="{ width: order.width, backgroundColor: order.color }"
      ></div>
    </div>
    <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">
      Total incl tax: {{ order.totalPrice }}€
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">Subtotal: {{ order.subtotal }}€</p>
    <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">Tax: {{ order.tax }}€</p>
    <AButton
      :classValue="'bg-indigo-500 mt-2 w-full'"
      v-if="order.status === 'COMPLETE'"
      @click="handlePaymentRoute(order)"
    >
      Pay this order
    </AButton>
    <AButton
      :classValue="'bg-indigo-500 mt-2 w-full'"
      v-if="order.status === 'CREATED'"
      @click="handleCheckoutRoute(order)"
    >
      Complete my order
    </AButton>
    <AButton :classValue="'bg-indigo-500 mt-2 w-full'" @click="emitOrderDetails(order)">
      Order details
    </AButton>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
export default {
  name: 'MordersList',
  emits: ['m-orders-list'],
  components: {
    AButton,
  },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    pushOrder(orders, width, color, order) {
      orders.push({
        ...order,
        width,
        color,
      })
    },
    handleCheckoutRoute(item) {
      this.$router.push(`/checkout/${item.id}`)
    },
    handlePaymentRoute(item) {
      this.$router.push(`/payment/${item.id}`)
    },
    emitOrderDetails(item) {
      this.$emit('m-orders-list', item)
    },
  },
  computed: {
    fOrders() {
      const fOrders = []
      this.orders.forEach((order) => {
        if (order.status === 'CREATED') {
          this.pushOrder(fOrders, '33%', 'green', order)
        }
        if (order.status === 'CANCEL') {
          this.pushOrder(fOrders, '100%', 'red', order)
        }
        if (order.status === 'COMPLETE') {
          this.pushOrder(fOrders, '66%', 'green', order)
        }
        if (order.status === 'PAID') {
          this.pushOrder(fOrders, '100%', 'green', order)
        }
      })
      return fOrders
    },
  },
}
</script>
