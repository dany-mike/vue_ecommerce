<template>
  <div
    class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16"
  >
    <p class="text-2xl italic font-medium">
      Order number {{ orderId }} has been created successfuly ! Order is on the way 🎉
    </p>
  </div>
</template>

<script>
export default {
  name: 'SuccessPage',
  data() {
    return {
      orderId: null,
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId
  },
}
</script>
