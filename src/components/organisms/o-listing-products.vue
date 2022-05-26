<template>
  <div class="o-listing-products">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
      <div v-for="product in products" :key="product.id" class="w-full px-4 lg:px-0">
        <router-link :to="`/products/${product.id}`">
          <div class="p-3 bg-white rounded shadow-md">
            <div class="">
              <div class="relative w-full mb-3 h-62 lg:mb-0">
                <img
                  src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552__480.jpg"
                  alt="Just a flower"
                  class="object-fill w-full h-full rounded"
                />
              </div>
              <div class="flex-auto p-2 justify-evenly">
                <div class="flex flex-wrap">
                  <div class="flex items-center justify-between w-full min-w-0">
                    <h2 class="mr-auto text-lg cursor-pointer hover:text-gray-900">
                      {{ product.name }}
                    </h2>
                  </div>
                </div>
                <div class="mt-1 text-xl font-semibold">{{ product.price }}€</div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OListingProducts',
  props: {
    products: {
      type: String,
      required: true,
    },
  },
}
</script>
