<template>
  <div class="m-address-card px-24 min-w-max">
    <div class="p-10">
      <!--Card 1-->
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">City: {{ item.city }}</div>
          <p class="text-gray-700 text-base">
            Street: {{ item.streetNumber }} {{ item.streetName }}
          </p>
          <p class="text-gray-700 text-base">Postal code: {{ item.postalCode }}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#photography</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#travel</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#winter</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MAddressCard',
  props: {
    item: {
      type: [Object, String, Number],
      required: true,
    },
    addressId: {
      type: Number,
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
