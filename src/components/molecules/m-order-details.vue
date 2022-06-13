<template>
  <div class="m-order-details">
    <div
      class="m-orders-details w-full mt-10 block p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex justify-between mb-1">
        <span class="text-base font-medium dark:text-white" :style="{ color: fItem.color }">{{
          item.status
        }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="h-2.5 rounded-full"
          :style="{ width: fItem.width, backgroundColor: fItem.color }"
        ></div>
      </div>
      <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">
        Total incl tax: {{ item.totalPrice }}€
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">
        Subtotal: {{ item.subtotal }}€
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">Tax: {{ item.tax }}€</p>
      <AButton
        :classValue="'bg-indigo-500 mt-2 w-full'"
        v-if="item.status === 'COMPLETE'"
        @click="handlePaymentRoute(item)"
      >
        Pay this order
      </AButton>
      <AButton
        :classValue="'bg-indigo-500 mt-2 w-full'"
        v-if="item.status === 'CREATED'"
        @click="handleCheckoutRoute(item)"
      >
        Complete my order
      </AButton>
    </div>
    <AButton :classValue="'bg-indigo-500 mt-2 w-full'" @click="emitOrderList">
      Back to orders list
    </AButton>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
export default {
  name: 'MOrderDetails',
  components: {
    AButton,
  },
  mounted() {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    fItem() {
      const fItem = {}
      return this.getFItem(fItem, this.item.status)
    },
  },
  emits: ['m-order-details'],
  methods: {
    getFItem(element, status) {
      let color = 'green'
      let width = ''
      if (status === 'CANCEL') {
        color = 'red'
        width = '100%'
      }

      if (status === 'CREATED') {
        width = '33%'
      }

      if (status === 'COMPLETE') {
        width = '66%'
      }

      if (status === 'PAID') {
        width = '100%'
      }

      element = {
        ...this.item,
        color,
        width,
      }
      return element
    },
    emitOrderList() {
      this.$emit('m-order-details')
    },
    handleCheckoutRoute(item) {
      this.$router.push(`/checkout/${item.id}`)
    },
    handlePaymentRoute(item) {
      this.$router.push(`/payment/${item.id}`)
    },
  },
}
</script>
