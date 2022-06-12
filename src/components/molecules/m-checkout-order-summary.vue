<template>
  <div>
    <div class="mt-10 lg:mt-0">
      <h2 class="text-2xl font-medium text-gray-900">Order summary</h2>
      <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 class="sr-only">Items in your cart</h3>
        <ul role="list" class="divide-y divide-gray-200">
          <li class="flex py-6 px-4 sm:px-6" :key="item.id" v-for="item in items">
            <div class="flex-shrink-0">
              <img
                :src="item.image"
                :alt="`Front of men&#039;s ${item.name} in black.`"
                class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
              />
            </div>

            <div class="ml-6 flex-1 flex flex-col">
              <div class="flex">
                <div class="min-w-0 flex-1">
                  <h4 class="text-sm">
                    <a href="#" class="font-medium text-gray-700 hover:text-gray-800">
                      {{ item.name }}
                    </a>
                  </h4>
                  <h4 class="text-sm">
                    <a href="#" class="font-medium text-gray-700 hover:text-gray-800">
                      Quantity: {{ item.quantity }}
                    </a>
                  </h4>
                </div>
              </div>

              <div class="flex-1 pt-2 flex items-end justify-between">
                <p class="mt-1 text-sm font-medium text-gray-900">
                  Price: {{ productPrice(item) }}€ (incl: tax)
                </p>
              </div>
            </div>
          </li>
        </ul>
        <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div class="flex items-center justify-between">
            <dt class="text-sm">Subtotal</dt>
            <dd class="text-sm font-medium text-gray-900">{{ orderSummary.subtotal }}€</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-sm">Tax</dt>
            <dd class="text-sm font-medium text-gray-900">{{ orderSummary.tax }}€</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt class="text-base font-medium">Total</dt>
            <dd class="text-base font-medium text-gray-900">{{ orderSummary.totalPrice }}€</dd>
          </div>
          <!-- <p class="mt-1 text-sm text-gray-500">Black</p>
          <p class="mt-1 text-sm text-gray-500">Large</p> -->
        </dl>
      </div>
    </div>
    <div class="err-message-container hidden lg:flex lg:justify-center lg:mt-3">
      <p v-if="shippingAddressErr && !shippingAddressId" class="text-red-700 font-semibold">
        Shipping address {{ shippingAddressErr.toLowerCase() }}
      </p>
    </div>
    <div class="err-message-container hidden lg:flex lg:justify-center lg:mt-3">
      <p v-if="billingAddressErr && !billingAddressId" class="text-red-700 font-semibold">
        Billing address {{ billingAddressErr.toLowerCase() }}
      </p>
    </div>
    <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
      <button
        @click="onSubmit"
        class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
      >
        Confirm order
      </button>
    </div>
  </div>
</template>

<script>
import { COMPLETE_ORDER } from '@/store/modules/order/types'
export default {
  name: 'MCheckoutOrderSummary',
  props: {
    orderTotal: {
      type: Number,
      default: 0,
    },
    user: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
    orderSummary: {
      type: Object,
      default: () => {},
    },
    shippingAddressId: {
      type: Number,
      default: null,
    },
    billingAddressId: {
      type: Number,
      default: null,
    },
    vuelidate: {
      type: Object,
      default: () => {},
    },
    shippingAddressErr: {
      type: String,
      default: '',
    },
    billingAddressErr: {
      type: String,
      default: '',
    },
  },
  emits: [
    'shipping-address-error',
    'billing-address-error',
    'clear-shipping-address-error',
    'clear-billing-address-error',
  ],
  methods: {
    async onSubmit() {
      if (this.vuelidate.$invalid) {
        this.$emit(
          'shipping-address-error',
          this.vuelidate.selectedShippingAddress.$silentErrors[0]?.$message,
        )
        this.$emit(
          'billing-address-error',
          this.vuelidate.selectedShippingAddress.$silentErrors[0]?.$message,
        )
        return
      }
      const body = {
        status: 'COMPLETE',
        userToken: this.user.accessToken,
        orderId: this.orderSummary.id,
        billingAddressId: this.billingAddressId,
        shippingAddressId: this.shippingAddressId,
      }

      await this.$store.dispatch(`${COMPLETE_ORDER}`, body)
    },
    productPrice(item) {
      return item.price * item.quantity
    },
  },
}
</script>
