<template>
  <div class="min-w-screen min-h-screen bg-gray-200">
    <div class="flex items-center justify-center px-5 pb-10 pt-16">
      <p class="text-2xl italic font-medium">
        Order number {{ orderId }} has been created successfuly ! Order is on the way 🎉
      </p>
    </div>
    <div class="bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
      <p class="text-xl italic font-medium">
        Check your {{ user.email }} email address to check your invoice. 📧
      </p>
    </div>
    <div class="bg-gray-200 justify-center px-5 pb-10 pt-16">
      <AButton
        @click="handleBack"
        :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
      >
        Back to shop
      </AButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AButton from '@/components/atoms/a-button.vue'
export default {
  name: 'SuccessPage',
  components: {
    AButton,
  },
  data() {
    return {
      orderId: null,
    }
  },
  async mounted() {
    this.orderId = this.$route.params.orderId
  },
  methods: {
    handleBack() {
      this.$router.push('/')
    },
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
    }),
  },
}
</script>
