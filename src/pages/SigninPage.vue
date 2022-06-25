<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
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

          <div>
            <AInput
              v-model="password"
              :label="'Password'"
              :type="'password'"
              :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
            />
          </div>
          <p class="text-red-700 font-semibold">{{ errorResponse }}</p>
          <div>
            <AButton
              :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
            >
              Sign in
            </AButton>
          </div>
        </form>

        <p class="mt-6 text-center text-base font-medium text-gray-500">
          Don't have an account ?
          {{ ' ' }}
          <span @click="handleSignup" class="text-indigo-600 hover:text-indigo-500 cursor-pointer">
            Sign up
          </span>
        </p>
        <p class="mt-6 text-center text-base font-medium text-gray-500">
          Forgot password ?
          {{ ' ' }}
          <span
            @click="handleForgotPassword"
            class="text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Click here !
          </span>
        </p>
        <!-- Implement OAuth2 on v2 -->
        <!-- <MOAuth2 /> -->
      </div>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import AInput from '@/components/atoms/a-input.vue'
import { GET_CURRENT_USER, SIGNIN } from '@/store/modules/auth/types'
import { mapGetters } from 'vuex'
// import MOAuth2 from '@/components/molecules/m-oauth2.vue'
export default {
  name: 'SigninPage',
  components: {
    AButton,
    AInput,
    // MOAuth2,
  },
  data() {
    return {
      email: '',
      password: '',
      errorResponse: '',
    }
  },
  methods: {
    handleSignup() {
      if (this.$route.query.type === 'add-wishlist') {
        this.$router.push({
          path: '/signup',
          query: {
            type: 'add-wishlist',
            productId: this.$route.query.productId,
          },
        })
      }
      if (this.$route.query.type === 'checkout') {
        this.$router.push({
          path: '/signup',
          query: {
            type: 'checkout',
          },
        })
      }
      if (this.$route.query.type === 'wishlist') {
        this.$router.push({ path: '/signup', query: { type: 'wishlist' } })
      }

      if (Object.entries(this.$route.query).length === 0 || this.$route.query.type === 'account') {
        this.$router.push('/signup')
      }
    },
    async handleForgotPassword() {
      this.$router.push('/forgot-password')
    },
    async onSubmit() {
      this.errorResponse = ''
      const body = {
        email: this.email,
        password: this.password,
      }
      await this.$store.dispatch(`${SIGNIN}`, body)
      await this.$store.dispatch(`${GET_CURRENT_USER}`)

      if (this.errRes) {
        this.errorResponse = this.errRes.message
      }

      if (this.user && this.$route.query.type === 'add-wishlist') {
        this.$router.push(`/wishlist/${this.user.id}/${this.$route.query.productId}`)
      }

      if (this.user && this.$route.query.type === 'wishlist') {
        this.$router.push(`/favorites`)
      }

      if (this.user?.role === 'admin' || this.user?.role === 'superAdmin') {
        this.$router.push('/admin')
      }

      if (this.$route.query.type === 'checkout') {
        this.$router.push('/add-order')
      }

      if (
        (this.user?.role === 'user' && Object.entries(this.$route.query).length === 0) ||
        this.$route.query.type === 'account'
      ) {
        this.$router.push('/my-account')
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
      errRes: 'getErrorResponse',
    }),
  },
}
</script>
