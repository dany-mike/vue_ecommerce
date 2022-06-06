<template>
  <div class="m-address-card py-8 px-48 min-w-max">
    <div class="card-container">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-normal text-xl mb-2">City: {{ item.city }}</div>
          <p class="text-gray-700 text-base">
            Street: {{ item.streetNumber }} {{ item.streetName }}
          </p>
          <p class="text-gray-700 text-base">Postal code: {{ item.postalCode }}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <AButton
            @click="handleSelect(item)"
            :classValue="'w-full flex justify-center mb-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
          >
            Select this address
          </AButton>
          <AButton
            @click="handleUpdate(item)"
            :classValue="'w-full flex justify-center mb-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
          >
            Update
          </AButton>
          <AButton
            @click="handleDelete(item)"
            :classValue="'w-full flex justify-center mb-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'"
          >
            Delete
          </AButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
export default {
  name: 'MAddressCard',
  components: {
    AButton,
  },
  props: {
    item: {
      type: [Object, String, Number],
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleSelect(address) {
      console.log(address)
    },
    handleUpdate(address) {
      console.log(address)
    },
    handleDelete(address) {
      console.log(address)
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
