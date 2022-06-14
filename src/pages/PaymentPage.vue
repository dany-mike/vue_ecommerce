<template>
  <div></div>
</template>

<script>
import { CREATE_PAYMENT_INTENT } from '@/store/modules/payment/types'
import { mapGetters } from 'vuex'

export default {
  name: 'PaymentPage',
  components: {},
  async mounted() {
    const body = {
      orderId: Number(this.$route.params.orderId),
    }

    await this.$store.dispatch(CREATE_PAYMENT_INTENT, body)
  },
  computed: {
    ...mapGetters({
      paymentIntent: 'getPaymentIntent',
    }),
  },
}
</script>
