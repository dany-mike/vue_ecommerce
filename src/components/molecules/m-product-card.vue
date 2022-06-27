<template>
  <div class="m-product-card px-24 min-w-max">
    <router-link :to="`/products/${item.id}`">
      <div class="p-3 bg-white rounded shadow-md">
        <div class="">
          <div class="relative w-full mb-3 h-96 lg:mb-0">
            <div class="max-w-md lg:max-w-none">
              <img
                :src="imageUrl(item)"
                alt="Just a flower"
                class="object-cover h-96 rounded w-96 lg:w-full"
              />
            </div>
          </div>
          <div class="flex-auto p-2 justify-evenly">
            <div class="flex flex-wrap">
              <div class="flex items-center justify-between w-full min-w-0">
                <h2 class="mr-auto text-lg cursor-pointer hover:text-gray-900">
                  {{ item.name }}
                </h2>
              </div>
            </div>
            <div class="mt-1 flex items-center">
              <p class="text-xl font-semibold">
                <span v-if="item && item.quantity">Price (Incl tax)</span> {{ item.price }}€
              </p>
            </div>
            <div class="flex">
              <p class="text-xl font-semibold" v-if="item && item.quantity">
                Quantity: *{{ item.quantity }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MProductCard',
  props: {
    item: {
      type: [Object, String, Number],
      required: true,
    },
  },
  methods: {
    imageUrl(product) {
      const imageUrl = product.image
        ? product.image
        : 'https://res.cloudinary.com/http-danymike-com/image/upload/v1654028697/ecommerce/marcus-ganahl-W5qgKZj-qnk-unsplash_h2vxby.jpg'
      return imageUrl
    },
  },
}
</script>

<style scoped>
@media (max-width: 1380px) {
  .o-card-width-mobile {
    width: 400px;
  }

  .m-product-card {
    padding: 30px;
  }
}

@media (min-width: 1380px) {
  .m-product-card {
    min-width: 700px;
  }
}
</style>
