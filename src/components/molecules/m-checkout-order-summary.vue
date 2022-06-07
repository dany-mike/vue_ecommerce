<template>
  <div>
    <div class="mt-10 lg:mt-0">
      <h2 class="text-2xl font-medium text-gray-900">Order summary</h2>
      <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 class="sr-only">Items in your cart</h3>
        <ul role="list" class="divide-y divide-gray-200">
          <li class="flex py-6 px-4 sm:px-6">
            <div class="flex-shrink-0">
              <img
                src="https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg"
                alt="Front of men&#039;s Basic Tee in black."
                class="w-20 rounded-md"
              />
            </div>

            <div class="ml-6 flex-1 flex flex-col">
              <div class="flex">
                <div class="min-w-0 flex-1">
                  <h4 class="text-sm">
                    <a href="#" class="font-medium text-gray-700 hover:text-gray-800">
                      Basic Tee
                    </a>
                  </h4>
                  <p class="mt-1 text-sm text-gray-500">Black</p>
                  <p class="mt-1 text-sm text-gray-500">Large</p>
                </div>
              </div>

              <div class="flex-1 pt-2 flex items-end justify-between">
                <p class="mt-1 text-sm font-medium text-gray-900">32.00€</p>
              </div>
            </div>
          </li>
        </ul>
        <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div class="flex items-center justify-between">
            <dt class="text-sm">Subtotal</dt>
            <dd class="text-sm font-medium text-gray-900">€</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-sm">Tax</dt>
            <dd class="text-sm font-medium text-gray-900">€</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt class="text-base font-medium">Total</dt>
            <dd class="text-base font-medium text-gray-900">€</dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
      <button
        type="submit"
        class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
      >
        Confirm order
      </button>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    async onSubmit() {
      const body = {
        orderItems: this.cart,
        status: 'CREATED',
        userToken: this.user.token,
      }

      console.log(body)
    },
  },
}
</script>
