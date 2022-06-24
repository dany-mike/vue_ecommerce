<template>
  <div></div>
  <li class="flex py-6 sm:py-10" v-for="item in cartItems" :key="item.id">
    <div class="flex-shrink-0">
      <img
        :src="imageUrl(item)"
        alt="Front of men&#039;s Basic Tee in sienna."
        class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
      />
    </div>

    <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
      <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        <div>
          <div class="flex justify-between">
            <h3 class="text-sm">
              <a href="#" class="font-medium text-gray-700 hover:text-gray-800">
                {{ item.name }}
              </a>
            </h3>
          </div>
          <p class="mt-1 text-sm font-medium text-gray-900">{{ productPrice(item) }}€</p>
        </div>

        <div class="mt-4 sm:mt-0 sm:pr-9">
          <label for="quantity-0" class="sr-only">Quantity, {{ item.name }}</label>
          <select
            @change="updateQuantity(item, $event)"
            id="quantity-0"
            name="quantity-0"
            class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option :value="item.quantity" class="bg-indigo-500 text-white">
              {{ item.quantity }}
            </option>
            <option v-for="q in quantities" :key="q.value" :value="q.value">
              {{ q.value }}
            </option>
          </select>

          <div class="absolute top-0 right-0">
            <button
              type="button"
              class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
              @click="deleteCartItem(item)"
            >
              <span class="sr-only">Remove</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { GET_CART, GET_CART_AFTER_DELETE } from '@/store/modules/cart/types'
import { formatPrice } from '@/helpers/price'
import { CALC_ORDER_TOTAL } from '@/store/modules/order/types'
export default {
  name: 'MCartItems',
  props: {
    cartItems: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['order-total'],
  data() {
    return {
      defaultValue: {
        value: '',
        label: '',
        quantities: [],
      },
    }
  },
  async mounted() {
    await this.$store.dispatch(`${GET_CART}`)
    this.$store.dispatch(CALC_ORDER_TOTAL, this.cartItems)
  },
  methods: {
    productPrice(item) {
      return formatPrice(item.price * item.quantity)
    },
    imageUrl(product) {
      const imageUrl = product.image
        ? product.image
        : 'https://res.cloudinary.com/http-danymike-com/image/upload/v1654028697/ecommerce/marcus-ganahl-W5qgKZj-qnk-unsplash_h2vxby.jpg'
      return imageUrl
    },
    async updateQuantity(item, event) {
      this.cartItems.forEach((c) => {
        if (item.id === c.id) {
          item.quantity = Number(event.target.value)
        }
      })
      localStorage.setItem('products', JSON.stringify(this.cartItems))
      this.$store.dispatch(GET_CART)
      this.$store.dispatch(CALC_ORDER_TOTAL, this.cartItems)
    },
    deleteCartItem(item) {
      const result = confirm(`Are you sure to remove ${item.name} from your cart`)

      if (result) {
        const filteredProducts = this.cartItems.filter((p) => {
          return p.id !== item.id
        })
        localStorage.setItem('products', JSON.stringify(filteredProducts))
        this.$store.dispatch(GET_CART_AFTER_DELETE, { item, cart: this.cartItems })
        // Set timeout to update price TODO: update total price without it
        setTimeout(() => {
          this.$store.dispatch(CALC_ORDER_TOTAL, this.cartItems)
        }, 1)
      }
    },
  },
  computed: {
    quantities() {
      let quantities = []

      for (let index = 1; index <= 5; index++) {
        quantities.push({
          label: index,
          value: index,
        })
      }
      return quantities
    },
  },
}
</script>
