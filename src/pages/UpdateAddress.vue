<template>
  <div class="add-address px-4">
    <p class="text-2xl lg:text-4xl py-6">{{ addressPageTitle() }}</p>
    <MAddressForm :is-update-address="true" />
  </div>
</template>

<script>
import MAddressForm from '@/components/molecules/m-address-form.vue'
export default {
  components: {
    MAddressForm,
  },
  name: 'UpdateAddress',
  data() {
    return {
      type: '',
      from: '',
    }
  },
  mounted() {
    this.scrollToTop()
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    addressPageTitle() {
      if (this.$route.query.type === 'shipping') {
        return 'Update shipping address'
      }
      if (this.$route.query.type !== 'shipping') {
        return 'Update billing address'
      }
    },
  },
}
</script>
