<template>
  <form class="a-product-cta mt-6">
    <div class="mt-10 flex sm:flex-col1">
      <button
        type="submit"
        class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
      >
        Add to cart
      </button>

      <button
        type="button"
        class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
      >
        <HeartIcon class="w-10 h-10 ml-2" @click="addToFavorite" v-if="isWishlistIcon(product)" />
        <span class="sr-only">Add to favorites</span>
      </button>
    </div>
  </form>
</template>

<script>
import { HeartIcon } from '@heroicons/vue/outline'
import { ADD_PRODUCT_TO_WISHLIST, FETCH_WISHLIST_PRODUCTS } from '@/store/modules/wishlist/types'
import { mapGetters } from 'vuex'
export default {
  name: 'AProductCta',
  components: {
    HeartIcon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    await this.$store.dispatch(`${FETCH_WISHLIST_PRODUCTS}`, this.user?.id)
  },
  methods: {
    async addToFavorite() {
      if (!this.user) {
        this.$router.push({
          path: '/signin',
          query: { type: 'add-wishlist', productId: this.product?.id },
        })
      }

      const body = {
        productId: this.product?.id,
      }
      const userId = this.user?.id

      await this.$store.dispatch(`${ADD_PRODUCT_TO_WISHLIST}`, { body, userId })
      this.$router.go(this.$router.currentRoute)
    },
    isWishlistIcon(productItem) {
      let isWishlistIcon = true

      if (this.user) {
        this.wishlistProducts.forEach((element) => {
          if (element.id === productItem.id) {
            isWishlistIcon = false
          }
        })
      }

      return isWishlistIcon
    },
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
    }),
  },
}
</script>
