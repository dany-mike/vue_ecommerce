<template>
  <div class="add-address px-4">
    <p class="text-2xl lg:text-4xl py-6">{{ addressPageTitle() }}</p>
    <!-- TODO: m-address-form component below -->
    <MAddressForm :type="type" :from="from" :addressId="addressId" />
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
      addressId: '',
    }
  },
  async mounted() {
    this.$router.currentRoute._value.query.type === 'shipping'
      ? (this.type = 'shipping')
      : (this.type = 'billing')
    this.$router.currentRoute._value.query.from === 'checkout'
      ? (this.from = 'checkout')
      : (this.from = 'my-account')

    this.addressId = this.$route.query?.addressId
  },
  methods: {
    addressPageTitle() {
      if (this.$router.currentRoute._value.query.type === 'shipping') {
        return this.$route.query.addressId ? 'Update shipping address' : 'Add shipping address'
      }
      if (this.$router.currentRoute._value.query.type !== 'shipping') {
        return this.$route.query.addressId ? 'Update shipping address' : 'Add shipping address'
      }
    },
  },
}
</script>
