<template>
  <div class="add-address px-4">
    <p class="text-2xl lg:text-4xl py-6">{{ addressPageTitle() }}</p>
    <MAddressForm :type="type" :from="from" :is-update-address="true" />
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
    this.$router.currentRoute._value.query.type === 'shipping'
      ? (this.type = 'shipping')
      : (this.type = 'billing')
    this.$router.currentRoute._value.query.from === 'checkout'
      ? (this.from = 'checkout')
      : (this.from = 'my-account')
  },
  methods: {
    addressPageTitle() {
      if (this.$router.currentRoute._value.query.type === 'shipping') {
        return 'Update shipping address'
      }
      if (this.$router.currentRoute._value.query.type !== 'shipping') {
        return 'Update billing address'
      }
    },
  },
}
</script>
