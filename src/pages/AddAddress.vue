<template>
  <div class="add-address px-4">
    <p class="text-2xl lg:text-4xl py-6">{{ addressPageTitle() }}</p>
    <MAddressForm :type="type" :from="from" />
  </div>
</template>

<script>
import MAddressForm from '@/components/molecules/m-address-form.vue'
export default {
  components: {
    MAddressForm,
  },
  name: 'AddAddress',
  data() {
    return {
      type: '',
      from: '',
    }
  },
  async mounted() {
    this.scrollToTop()
    this.$route.query.type === 'shipping' ? (this.type = 'shipping') : (this.type = 'billing')
    this.$route.query.from === 'checkout' ? (this.from = 'checkout') : (this.from = 'my-account')
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    addressPageTitle() {
      if (this.$route.query.type === 'shipping') {
        return 'Add shipping address'
      }
      if (this.$route.query.type !== 'shipping') {
        return 'Add billing address'
      }
    },
  },
}
</script>
