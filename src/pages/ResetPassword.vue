<template>
  <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Choose a new password</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <AInput
              v-model="password"
              :label="'Password'"
              :type="'password'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
          </div>
          <div>
            <AInput
              v-model="confirmPassword"
              :label="'Confirm password'"
              :type="'password'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
          </div>
          <p class="text-red-700 font-semibold">
            {{ Array.isArray(errRes?.message) ? errRes?.message[0] : errRes?.message }}
          </p>
          <p
            class="text-green-700 font-semibold"
            v-if="!errRes && Object.entries(resetPasswordRes).length !== 0"
          >
            Your password has been successfully update !
          </p>
          <div>
            <AButton
              :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
            >
              Reset password
            </AButton>
          </div>
        </form>
        <p class="mt-6 text-center text-base font-medium text-gray-500">
          <span
            @click="handleSigninPageLink"
            class="text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Back to signin
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
import { CLEAR_PASSWORD_ERROR_MESSAGE, RESET_PASSWORD } from '@/store/modules/auth/types'
export default {
  name: 'ResetPassword',
  components: {
    AButton,
    AInput,
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      token: this.$route.query.token,
    }
  },
  methods: {
    handleSigninPageLink() {
      this.$router.push('/signin')
    },
    async onSubmit() {
      this.$store.dispatch(CLEAR_PASSWORD_ERROR_MESSAGE)

      const body = {
        password: this.password,
        confirmPassword: this.confirmPassword,
      }

      await this.$store.dispatch(RESET_PASSWORD, {
        body,
        token: this.token,
      })
    },
  },
  computed: {
    ...mapGetters({
      errRes: 'getPasswordErrRes',
      resetPasswordRes: 'getResetPassword',
    }),
  },
}
</script>
