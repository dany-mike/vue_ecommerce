<template>
  <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Enter your email address. You'll receive a reset password link by email
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <AInput
              v-model="email"
              :label="'Email address'"
              :type="'text'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
          </div>
          <p class="text-red-700 font-semibold">
            {{ Array.isArray(errRes?.message) ? errRes?.message[0] : errRes?.message }}
          </p>
          <p
            class="text-green-700 font-semibold"
            v-if="!errRes && Object.entries(resetLinkRes).length !== 0"
          >
            Email sent check your {{ email }} email address
          </p>
          <div>
            <AButton
              @click="onSubmit"
              :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
            >
              Receive reset password link
            </AButton>
          </div>
        </form>
        <p class="mt-6 text-center text-base font-medium text-gray-500">
          <span
            @click="handleSigninPageLink"
            class="text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Back
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import AInput from '@/components/atoms/a-input.vue'
import { mapGetters } from 'vuex'
import { CLEAR_ERROR_RESPONSE, SEND_RESET_LINK } from '@/store/modules/email/types'
export default {
  name: 'ForgotPassword',
  components: {
    AButton,
    AInput,
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    handleSigninPageLink() {
      this.$router.push('/signin')
    },
    onSubmit() {
      this.$store.dispatch(CLEAR_ERROR_RESPONSE)

      const body = {
        email: this.email,
      }

      this.$store.dispatch(SEND_RESET_LINK, body)

      if (this.errRes) {
        return
      }
    },
  },
  computed: {
    ...mapGetters({
      errRes: 'getEmailErrResponse',
      resetLinkRes: 'getResetLink',
    }),
  },
}
</script>
