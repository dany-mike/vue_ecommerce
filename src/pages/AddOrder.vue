<template>
  <div></div>
</template>
<script>
import { mapGetters } from 'vuex'
import { CREATE_ORDER } from '@/store/modules/order/types'
import { GET_CART } from '@/store/modules/cart/types'
export default {
  name: 'AddWishlistItem',
  async mounted() {
    this.$store.dispatch(GET_CART)
    const body = {
      orderItems: this.cart,
      status: 'CREATED',
      userToken: this.user?.accessToken,
    }
    await this.$store.dispatch(CREATE_ORDER, body)
    this.$router.push(`/checkout/${this.order.id}`)
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
      cart: 'getCart',
      order: 'getOrderResponse',
    }),
  },
}
</script>
