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
      <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">Total incl tax: {{ fTotal }}€</p>
      <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">Subtotal: {{ fSubtotal }}€</p>
      <p class="font-normal text-gray-700 dark:text-gray-400 mt-2">Tax: {{ fTax }}€</p>
      <div class="my-12">
        <!-- <OProductCarousel
          v-if="item.products?.length > 0"
          :title="'Products order'"
          :products="item.products"
          :items-to-show="2"
        /> -->
      </div>
      <AButton
        :classValue="'bg-indigo-500 mt-2 w-full'"
        v-if="item.status === 'COMPLETE' && item.products?.length > 0"
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
      <AButton :classValue="'bg-indigo-500 mt-2 w-full'" @click="emitOrderList">
        Back to orders list
      </AButton>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
// import OProductCarousel from '@/components/organisms/o-product-carousel.vue'
import { formatPrice } from '@/helpers/price'
export default {
  name: 'MOrderDetails',
  components: {
    AButton,
    // OProductCarousel,
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
    fTotal() {
      return formatPrice(this.item.totalPrice)
    },
    fSubtotal() {
      return formatPrice(this.item.subtotal)
    },
    fTax() {
      return formatPrice(this.item.tax)
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
