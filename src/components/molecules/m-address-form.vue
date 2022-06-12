<template>
  <div class="m-address-form">
    <div class="sm:col-span-2 pt-2">
      <AInput
        v-model="streetName.value"
        :label="'Street name'"
        :type="'text'"
        :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
      />
    </div>
    <div class="flex w-full justify-center items-center">
      <p class="text-red-700 font-semibold">{{ streetName.errorMessage }}</p>
    </div>
    <div class="sm:col-span-2 pt-2">
      <AInput
        v-model="streetNumber.value"
        :label="'Street number (optional)'"
        :type="'text'"
        :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
      />
    </div>
    <div class="sm:col-span-2 pt-2">
      <AInput
        v-model="city.value"
        :label="'City'"
        :type="'text'"
        :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
      />
    </div>
    <div class="flex w-full justify-center items-center">
      <p class="text-red-700 font-semibold">{{ city.errorMessage }}</p>
    </div>
    <div class="sm:col-span-2 pt-2">
      <AInput
        v-model="postalCode.value"
        :label="'Postal code'"
        :type="'text'"
        :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
      />
    </div>
    <div class="flex w-full justify-center items-center">
      <p class="text-red-700 font-semibold">{{ postalCode.errorMessage }}</p>
    </div>
    <div class="mt-8">
      <AButton
        @click="onSubmit"
        :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
      >
        {{ buttonText }}
      </AButton>
    </div>
    <div class="mt-4">
      <AButton
        @click="handleBack"
        :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
      >
        Back
      </AButton>
    </div>
  </div>
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'
import AButton from '@/components/atoms/a-button.vue'
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import {
  CREATE_BILLING_ADDRESS,
  CREATE_SHIPPING_ADDRESS,
  FETCH_BILLING_ADDRESS,
  FETCH_SHIPPING_ADDRESS,
  UPDATE_BILLING_ADDRESS,
  UPDATE_SHIPPING_ADDRESS,
} from '@/store/modules/address/types'
import { mapGetters } from 'vuex'

export default {
  name: 'MAddressForm',
  components: {
    AInput,
    AButton,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  async mounted() {
    this.type = this.$route.query.type
    this.from = this.$route.query.from
    if (this.type === 'shipping' && this.isUpdateAddress) {
      await this.$store.dispatch(`${FETCH_SHIPPING_ADDRESS}`, {
        userId: this.user.id,
        addressId: this.$route.params.id,
      })
      this.setFormItems()
    }
    if (this.type !== 'shipping' && this.isUpdateAddress) {
      await this.$store.dispatch(`${FETCH_BILLING_ADDRESS}`, {
        userId: this.user.id,
        addressId: this.$route.params.id,
      })
      this.setFormItems()
    }
  },
  data() {
    return {
      type: '',
      from: '',
      streetName: {
        value: '',
        errorMessage: '',
      },
      streetNumber: {
        value: '',
      },
      city: {
        value: '',
        errorMessage: '',
      },
      postalCode: {
        value: '',
        errorMessage: '',
      },
    }
  },
  props: {
    isUpdateAddress: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setFormItems() {
      this.streetName.value = this.addressItem?.streetName
      this.streetNumber.value = this.addressItem?.streetNumber
      this.city.value = this.addressItem?.city
      this.postalCode.value = this.addressItem?.postalCode
    },
    handleBack() {
      this.$route.query.from === 'checkout'
        ? this.$router.push(`/checkout/${this.$route.query.orderId}`)
        : this.$router.push('/my-account')
    },
    async onSubmit() {
      this.streetName.errorMessage = ''
      ;(this.city.errorMessage = ''), (this.postalCode.errorMessage = '')
      if (this.v$.$invalid) {
        this.streetName.errorMessage = this.v$.streetName.$silentErrors[0]?.$message
        this.city.errorMessage = this.v$.city.$silentErrors[0]?.$message
        this.postalCode.errorMessage = this.v$.postalCode.$silentErrors[0]?.$message
        return
      }

      const body = {
        streetName: this.streetName.value,
        streetNumber: this.streetNumber.value,
        city: this.city.value,
        postalCode: this.postalCode.value,
        // TODO: handle property below when i18n
        countryCode: 'FR',
        userId: this.user.id,
      }

      if (this.type === 'shipping') {
        this.isUpdateAddress
          ? await this.$store.dispatch(`${UPDATE_SHIPPING_ADDRESS}`, {
              body,
              id: this.$route.params.id,
            })
          : await this.$store.dispatch(`${CREATE_SHIPPING_ADDRESS}`, body)
      }

      if (this.type !== 'shipping') {
        this.isUpdateAddress
          ? await this.$store.dispatch(`${UPDATE_BILLING_ADDRESS}`, {
              body,
              id: this.$route.params.id,
            })
          : await this.$store.dispatch(`${CREATE_BILLING_ADDRESS}`, body)
      }

      this.from === 'checkout'
        ? this.$router.push(`/checkout/${this.$route.query.orderId}`)
        : this.$router.push('/my-account')
    },
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser',
      addressItem: 'getAddressItem',
    }),
    buttonText() {
      if (this.isUpdateAddress) {
        return this.type === 'shipping' ? 'Update shipping address' : 'Update billing address'
      }

      if (!this.isUpdateAddress) {
        return this.type === 'shipping' ? 'Add shipping address' : 'Add billing address'
      }

      return 'Submit'
    },
  },
  validations() {
    return {
      streetName: {
        value: {
          required,
        },
      },
      city: {
        value: {
          required,
        },
      },
      postalCode: {
        value: {
          required,
          numeric,
        },
      },
    }
  },
}
</script>
