<template>
  <div></div>
</template>
<script>
import { mapGetters } from 'vuex'
import { CREATE_ORDER } from '@/store/modules/order/types'
import { GET_CART } from '@/store/modules/cart/types'
import { GET_CURRENT_USER } from '@/store/modules/auth/types'
export default {
  name: 'AddOrder',
  async mounted() {
    this.$store.dispatch(GET_CURRENT_USER)
    this.$store.dispatch(GET_CART)
    const body = {
      orderItemsDto: this.cart,
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
      order: 'getCreateOrder',
    }),
  },
}
</script>
