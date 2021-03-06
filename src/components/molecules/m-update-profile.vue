<template>
  <div class="m-update-profile">
    <p class="text-2xl font-medium py-4">Update profile</p>
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="bg-white py-6 px-4 sm:p-6">
        <div class="mt-6 grid grid-cols-4 gap-6">
          <div class="col-span-4 sm:col-span-2">
            <AInput
              v-model="firstname.value"
              :label="'Firstname'"
              :type="'text'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
            <div class="flex w-full justify-center items-center" v-if="!firstname.value">
              <p class="text-red-700 font-semibold">{{ firstname.errMsg }}</p>
            </div>
          </div>

          <div class="col-span-4 sm:col-span-2">
            <AInput
              v-model="lastname.value"
              :label="'Lastname'"
              :type="'text'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
            <div class="flex w-full justify-center items-center" v-if="!lastname.value">
              <p class="text-red-700 font-semibold">{{ lastname.errMsg }}</p>
            </div>
          </div>

          <div class="col-span-4 sm:col-span-2">
            <AInput
              v-model="email.value"
              :label="'Email address'"
              :type="'email'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
            <div class="flex w-full justify-center items-center">
              <p class="text-red-700 font-semibold">{{ email.errMsg }}</p>
            </div>
          </div>
          <div class="col-span-4 sm:col-span-2">
            <AInput
              v-model="password.value"
              :label="'Password'"
              :type="'password'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
            <div class="flex w-full justify-center items-center">
              <p class="text-red-700 font-semibold">{{ password.errMsg }}</p>
            </div>
            <div class="flex w-full justify-center items-center">
              <p class="text-red-700 font-semibold">{{ errRes?.message }}</p>
            </div>
            <div class="flex w-full justify-center items-center mt-2">
              <p class="text-green-700 font-semibold" v-if="success">
                User information updated successfully
              </p>
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
    </div>
  </div>
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'
import AButton from '@/components/atoms/a-button.vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import {
  CLEAR_AUTH_RES,
  CLEAR_PASSWORD_ERROR_MESSAGE,
  FETCH_USER_BY_ID,
  UPDATE_USER_INFO,
} from '@/store/modules/auth/types'
import { mapGetters } from 'vuex'

export default {
  name: 'MUpdateProfile',
  components: {
    AInput,
    AButton,
  },
  mounted() {
    this.setFormItems()
  },
  unmounted() {
    this.$store.dispatch(CLEAR_AUTH_RES)
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      success: false,
      firstname: {
        value: '',
        errMsg: '',
      },
      lastname: {
        value: '',
        errMsg: '',
      },
      email: {
        value: '',
        errMsg: '',
      },
      password: {
        value: '',
        errMsg: '',
      },
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setFormItems() {
      this.firstname.value = this.user?.firstname
      this.lastname.value = this.user?.lastname
      this.email.value = this.user?.email
    },
    async onSubmit() {
      this.$store.dispatch(CLEAR_AUTH_RES)
      this.success = false
      this.email.errMsg = ''
      this.password.errMsg = ''
      if (this.v$.$invalid) {
        this.firstname.errMsg = this.v$.firstname.$silentErrors[0]?.$message
        this.lastname.errMsg = this.v$.lastname.$silentErrors[0]?.$message
        this.email.errMsg = this.v$.email.$silentErrors[0]?.$message
        this.password.errMsg = this.v$.password.$silentErrors[0]?.$message
        return
      }

      const body = {
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        email: this.user?.email,
        newEmail: this.email.value,
        password: this.password.value,
      }

      await this.$store.dispatch(UPDATE_USER_INFO, body)

      if (this.authRes) {
        this.success = true
        this.$store.dispatch(CLEAR_PASSWORD_ERROR_MESSAGE)
        await this.$store.dispatch(`${FETCH_USER_BY_ID}`, this.user?.id)
      }
    },
  },
  beforeUnmount() {
    this.success = false
  },
  computed: {
    ...mapGetters({
      errRes: 'getErrorResponse',
      authRes: 'getAuthResponse',
    }),
  },
  validations() {
    return {
      firstname: {
        value: {
          required,
        },
      },
      lastname: {
        value: {
          required,
        },
      },
      email: {
        value: {
          required,
          email,
        },
      },
      password: {
        value: {
          required,
        },
      },
    }
  },
}
</script>
