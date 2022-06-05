<template>
  <div class="add-address px-4">
    <p class="text-2xl lg:text-4xl py-6">Add {{ addressPageTitle() }}</p>
    <div class="sm:col-span-2 pt-2">
      <AInput
        v-model="streetName.value"
        :label="'Street name'"
        :type="'text'"
        :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
      />
    </div>
    <div class="sm:col-span-2 pt-2">
      <AInput
        v-model="streetNumber.value"
        :label="'Street number'"
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
    <div class="sm:col-span-2 pt-2">
      <AInput
        v-model="postalCode.value"
        :label="'Postal code'"
        :type="'text'"
        :classValue="'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'"
      />
    </div>
    <div class="mt-8">
      <AButton
        :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
      >
        Add {{ addressPageTitle() }}
      </AButton>
    </div>
    <div class="mt-4">
      <AButton
        @click="handleBack"
        :classValue="'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bgw-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
      >
        Back
      </AButton>
    </div>
  </div>
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'
import AButton from '@/components/atoms/a-button.vue'
export default {
  name: 'AddAddress',
  components: {
    AInput,
    AButton,
  },
  data() {
    return {
      routerValue: null,
      streetName: {
        value: '',
        errorMessage: '',
      },
      streetNumber: {
        value: '',
        errorMessage: '',
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
  methods: {
    addressPageTitle() {
      return this.$router.currentRoute._value.query.type === 'shipping'
        ? 'shipping address'
        : 'billing address'
    },
    handleBack() {
      this.$router.currentRoute._value.query.from === 'checkout'
        ? this.$router.push('checkout')
        : this.$router.push('my-account')
    },
  },
}
</script>
