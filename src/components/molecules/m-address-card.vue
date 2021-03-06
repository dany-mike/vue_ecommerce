<template>
  <div
    :class="{
      'm-address-card py-8 px-48 min-w-max': !isSelected,
      'w-full': isSelected,
    }"
    v-if="item"
  >
    <div class="card-container">
      <div
        class="rounded overflow-hidden shadow-lg"
        :class="{
          'max-w-sm': !isSelected,
        }"
      >
        <div class="px-6 py-4">
          <div class="font-normal text-xl mb-2">City: {{ item?.city }}</div>
          <p class="text-gray-700 text-base">
            Street: {{ item?.streetNumber }} {{ item?.streetName }}
          </p>
          <p class="text-gray-700 text-base">Postal code: {{ item?.postalCode }}</p>
        </div>
        <div class="px-6 pt-4 pb-2" v-if="!isSelected">
          <div @click="handleSelect(item)">
            <AButton
              v-if="!isMyAccount"
              :classValue="'w-full flex justify-center mb-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
            >
              Select this address
            </AButton>
          </div>
          <div @click="handleUpdate(item)">
            <AButton
              :classValue="'w-full flex justify-center mb-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
            >
              Update
            </AButton>
          </div>
          <div @click="handleDelete(item, type)">
            <AButton
              :classValue="'w-full flex justify-center mb-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
            >
              Delete
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
import {
  AFTER_DELETE_BILLING_ADDRESS,
  AFTER_DELETE_SHIPPING_ADDRESS,
  DELETE_BILLING_ADDRESS,
  DELETE_SHIPPING_ADDRESS,
} from '@/store/modules/address/types'
export default {
  name: 'MAddressCard',
  components: {
    AButton,
  },
  props: {
    item: {
      type: [Object, null],
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    from: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isMyAccount: {
      type: Boolean,
      default: false,
    },
    addresses: {
      type: [Array, Object],
      default: null,
    },
  },
  emits: ['m-address-card'],
  methods: {
    handleSelect(address) {
      this.$emit('m-address-card', address)
    },
    handleUpdate(item) {
      if (this.type === 'shipping') {
        this.from === 'checkout'
          ? this.$router.push(
              `/update-address/${item.id}?type=shipping&from=checkout&orderId=${this.orderId}`,
            )
          : this.$router.push(
              `/update-address/${item.id}?type=shipping&from=my-account&orderId=${this.orderId}`,
            )
      }
      if (this.type !== 'shipping') {
        this.from === 'checkout'
          ? this.$router.push(
              `/update-address/${this.item.id}?type=billing&from=checkout&orderId=${this.orderId}`,
            )
          : this.$router.push(
              `/update-address/${this.item.id}?type=billing&from=my-account&orderId=${this.orderId}`,
            )
      }
    },
    async handleDelete(address, type) {
      const result = confirm(`Are you sure to delete this ${type} address`)
      if (result) {
        if (type === 'shipping') {
          await this.$store.dispatch(`${DELETE_SHIPPING_ADDRESS}`, address.id)
          this.$store.dispatch(AFTER_DELETE_SHIPPING_ADDRESS, {
            address,
            addresses: this.addresses,
          })
        }
        if (type === 'billing') {
          await this.$store.dispatch(`${DELETE_BILLING_ADDRESS}`, address.id)
          this.$store.dispatch(AFTER_DELETE_BILLING_ADDRESS, { address, addresses: this.addresses })
        }
      }
    },
  },
  computed: {
    orderId() {
      return this.$route.params.id
    },
  },
}
</script>

<style scoped>
@media (max-width: 1380px) {
  .o-card-width-mobile {
    width: 400px;
  }

  .m-address-card {
    padding: 30px;
  }
}

@media (min-width: 1380px) {
  .m-address-card {
    min-width: 700px;
  }
}
</style>
