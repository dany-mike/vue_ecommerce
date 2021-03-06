<template>
  <div class="m-update-password">
    <p class="text-2xl font-medium py-4">Choose new password</p>
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="bg-white py-6 px-4 sm:p-6">
        <div class="mt-6 grid grid-cols-4 gap-6">
          <div class="col-span-4 sm:col-span-2">
            <AInput
              v-model="password.value"
              :label="'Enter your current password'"
              :type="'password'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
            <div class="flex w-full justify-center items-center" v-if="!password.value">
              <p class="text-red-700 font-semibold">{{ password.errMsg }}</p>
            </div>
            <div class="flex w-full justify-center items-center">
              <p class="text-red-700 font-semibold">{{ errRes?.message }}</p>
            </div>
          </div>
          <div class="col-span-4 sm:col-span-2">
            <AInput
              v-model="newPassword.value"
              :label="'Enter your new password'"
              :type="'password'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
            <div class="flex w-full justify-center items-center">
              <p class="text-red-700 font-semibold">{{ newPassword.errMsg }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <AButton
          @click="onSubmit"
          :classValue="'bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'"
        >
          Save
        </AButton>
      </div>
      <div class="flex w-full justify-center items-center">
        <p class="text-green-700 font-semibold py-8">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'
import AButton from '@/components/atoms/a-button.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import {
  CLEAR_AUTH_RES,
  CLEAR_PASSWORD_ERROR_MESSAGE,
  UPDATE_PASSWORD,
} from '@/store/modules/auth/types'

const regexPasswordValidation = helpers.regex(
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
)

const passwordValidation = helpers.withMessage(
  'Password is too weak: must have 1 upper case letter, 1 lower case letter, 1 number or special character',
  regexPasswordValidation,
)

export default {
  name: 'MUpdatePassword',
  components: {
    AInput,
    AButton,
  },
  computed: {
    ...mapGetters({
      errRes: 'getPasswordErrRes',
      authRes: 'getAuthResponse',
    }),
  },
  unmounted() {
    this.$store.dispatch(CLEAR_AUTH_RES)
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      successMessage: '',
      password: {
        value: '',
        errMsg: '',
      },
      newPassword: {
        value: '',
        errMsg: '',
      },
    }
  },
  // updated() {
  //   // this.successMessage = ''
  // },
  methods: {
    async onSubmit() {
      this.$store.dispatch(CLEAR_AUTH_RES)
      this.password.errMsg = ''
      this.newPassword.errMsg = ''

      if (this.v$.$invalid) {
        this.password.errMsg = this.v$.password.$silentErrors[0]?.$message
        this.newPassword.errMsg = this.v$.newPassword.$silentErrors[0]?.$message
        return
      }

      const body = {
        email: this.user.email,
        newPassword: this.newPassword.value,
        password: this.password.value,
      }

      await this.$store.dispatch(UPDATE_PASSWORD, body)

      if (this.authRes) {
        this.successMessage = 'Password updated successfuly'
        this.password.value = ''
        this.newPassword.value = ''
        this.$store.dispatch(CLEAR_PASSWORD_ERROR_MESSAGE)
        setTimeout(() => {
          this.successMessage = ''
        }, 7000)
      }
    },
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  validations() {
    return {
      password: {
        value: {
          required,
        },
      },
      newPassword: {
        value: {
          required,
          passwordValidation,
        },
      },
    }
  },
}
</script>
