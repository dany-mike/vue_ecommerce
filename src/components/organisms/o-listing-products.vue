<template>
  <div class="o-listing-products">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
      <div v-for="product in products" :key="product.id" class="w-full px-4 lg:px-0">
        <router-link :to="`/products/${product.id}`">
          <div class="p-3 bg-white rounded shadow-md">
            <div class="">
              <div class="relative w-full mb-3 h-96 lg:mb-0">
                <img
                  :src="imageUrl(product)"
                  alt="Just a flower"
                  class="object-cover w-full h-96 rounded"
                />
              </div>
              <div class="flex-auto p-2 justify-evenly">
                <div class="flex flex-wrap">
                  <div class="flex items-center justify-between w-full min-w-0">
                    <h2 class="mr-auto text-lg cursor-pointer hover:text-gray-900">
                      {{ product.name }}
                    </h2>
                    <TrashIcon
                      class="w-10 h-10 mr-1 cursor-pointer ml-auto pt-1"
                      v-if="type"
                      @click="deleteWishlistItem(product)"
                    />
                  </div>
                </div>
                <div class="mt-1 flex items-center">
                  <p class="text-xl font-semibold">{{ product.price }}€</p>
                </div>
              </div>
              <div class="flex"></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { TrashIcon } from '@heroicons/vue/outline'
import { DELETE_WISHLIST_PRODUCT } from '@/store/modules/wishlist/types'
import { mapGetters } from 'vuex'
export default {
  components: {
    TrashIcon,
  },
  name: 'OListingProducts',
  props: {
    products: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
  },
  methods: {
    async deleteWishlistItem(product) {
      const userId = this.user?.id
      const productId = product.id
      const result = confirm(`Are you sure to delete this ${product.name} from your wishlist ?`)
      if (result) {
        await this.$store.dispatch(`${DELETE_WISHLIST_PRODUCT}`, { userId, productId })
      }
    },
    imageUrl(product) {
      const imageUrl = product.image
        ? product.image
        : 'https://res.cloudinary.com/http-danymike-com/image/upload/v1654028697/ecommerce/marcus-ganahl-W5qgKZj-qnk-unsplash_h2vxby.jpg'
      return imageUrl
    },
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
    }),
  },
}
</script>
