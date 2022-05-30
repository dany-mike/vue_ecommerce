<template>
  <div></div>
</template>
<script>
import { mapGetters } from 'vuex'
import { ADD_PRODUCT_TO_WISHLIST } from '@/store/modules/wishlist/types'
export default {
  name: 'AddWishlistItem',
  async mounted() {
    console.log(this.$router.currentRoute)
    const body = {
      productId: this.$router.currentRoute._value.params.productId,
    }
    const userId = this.$router.currentRoute._value.params.userId
    await this.$store.dispatch(`${ADD_PRODUCT_TO_WISHLIST}`, { body, userId })
    this.$router.push(`/products/${body.productId}`)
  },
  computed: {
    ...mapGetters({
      wishlistProducts: 'getWishlistResponse',
      user: 'getCurrentUser',
    }),
  },
}
</script>
