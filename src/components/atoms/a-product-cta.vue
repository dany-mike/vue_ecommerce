<template>
  <div class="a-product-cta mt-6">
    <div class="mt-10 flex justify-between">
      <button
        type="submit"
        class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
        @click="addToCart()"
      >
        Add to cart
      </button>
      <select
        @change="updateQuantity($event)"
        class="w-10 ml-4 lg:ml-0 rounded-md border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 shadow-s"
      >
        <option :value="selectedQuantity" class="bg-indigo-500 text-white">
          {{ selectedQuantity }}
        </option>
        <option v-for="q in quantities" :key="q.value">
          {{ q.value }}
        </option>
      </select>
      <button
        type="button"
        class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
      >
        <HeartIcon
          class="w-10 h-10 ml-2"
          :class="{
            'stroke-red-600 fill-red-600': !isWishlistIconEmpty,
          }"
          @click="addToFavorite"
        />
        <span class="sr-only">Add to favorites</span>
      </button>
    </div>
  </div>
</template>

<script>
import { HeartIcon } from '@heroicons/vue/outline'
import {
  ADD_PRODUCT_TO_WISHLIST,
  DELETE_WISHLIST_PRODUCT,
  FETCH_WISHLIST_PRODUCTS,
  HANDLE_WISHLIST_ICON,
} from '@/store/modules/wishlist/types'
import { mapGetters } from 'vuex'
import { GET_CART, GET_CART_ITEM_COUNT } from '@/store/modules/cart/types'
import { FETCH_PRODUCT } from '@/store/modules/products/types'
export default {
  name: 'AProductCta',
  components: {
    HeartIcon,
  },
  data() {
    return {
      cartProduct: {},
      selectedQuantity: Object.entries(this.cartItem).length > 0 ? this.cartItem.quantity : 1,
      fProduct: this.product,
    }
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    cartItem: {
      type: Object,
      default: () => {},
    },
  },
  async mounted() {
    await this.$store.dispatch(FETCH_PRODUCT, this.$route.params.id)
    if (this.user) {
      await this.$store.dispatch(`${FETCH_WISHLIST_PRODUCTS}`, this.user?.id)
      await this.$store.dispatch(HANDLE_WISHLIST_ICON, {
        userWishlist: this.wishlistProducts,
        item: this.pdct,
      })
    }
  },
  methods: {
    addToCart() {
      let products = []
      if (this.cart?.length > 0) {
        products = JSON.parse(localStorage.getItem('products'))
      }
      let canAdd = true
      products.forEach((product) => {
        if (product.id === this.product.id && product.quantity === this.selectedQuantity) {
          canAdd = false
          this.$toast.show(`${this.product.name} is already in your cart`)
        }
      })

      if (canAdd) {
        const filteredProducts = products.filter((p) => {
          return p.id !== this.product.id
        })

        localStorage.setItem('products', JSON.stringify(filteredProducts))

        this.addItemIntoCart(filteredProducts)

        localStorage.setItem('products', JSON.stringify(filteredProducts))

        this.$toast.show(`${this.product.name} added to your cart`)
        this.$store.dispatch(GET_CART)
        this.$store.dispatch(GET_CART_ITEM_COUNT, this.cart?.length)
        this.$router.push('/cart')
      }
    },
    addItemIntoCart(products) {
      products.push({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image,
        quantity: this.selectedQuantity,
      })
    },
    async addToFavorite() {
      if (!this.user) {
        this.$router.push({
          path: '/signin',
          query: { type: 'add-wishlist', productId: this.product?.id },
        })
      }

      if (!this.isWishlistIconEmpty) {
        this.$store.dispatch(DELETE_WISHLIST_PRODUCT, {
          userId: this.user?.id,
          productId: this.product?.id,
        })
        this.$toast.show(`${this.product?.name} remove from your favorite`)
      }

      if (this.isWishlistIconEmpty && this.user) {
        const body = {
          productId: this.product?.id,
        }
        const userId = this.user?.id

        await this.$store.dispatch(`${ADD_PRODUCT_TO_WISHLIST}`, { body, userId })
        this.$toast.show(`${this.product?.name} added to your favorite`)
      }
    },
    updateQuantity(e) {
      this.selectedQuantity = Number(e.target.value)
    },
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
      cart: 'getCart',
      isWishlistIconEmpty: 'getIsWishlistIcon',
      pdct: 'getProduct',
    }),
    quantities() {
      let quantities = []

      for (let index = 1; index <= 5; index++) {
        if (this.selectedQuantity !== index) {
          quantities.push({
            label: index,
            value: index,
          })
        }
      }

      return quantities
    },
  },
}
</script>
