<template>
  <div class="m-product-card w-full">
    <div class="bg-white rounded">
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
            <p class="text-xl font-semibold">Price (Incl tax) {{ item.price }}€</p>
          </div>
          <div class="flex">Quantity: *{{ item.quantity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MOrderItemCard',
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
}

@media (min-width: 1380px) {
  .m-product-card {
    min-width: 700px;
  }
}
</style>
