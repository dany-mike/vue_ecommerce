<template>
  <div class="m-product-card px-24 min-w-max">
    <router-link :to="`/products/${item.id}`">
      <div class="p-3 bg-white rounded shadow-md">
        <div class="">
          <div class="relative w-full mb-3 lg:h-96 h-64 lg:mb-0">
            <div class="max-w-md lg:max-w-none">
              <img
                src="https://res.cloudinary.com/http-danymike-com/image/upload/v1653982330/ecommerce/revolt-164_6wVEHfI-unsplash_yrrzu8.jpg"
                alt="Just a flower"
                class="object-cover lg:h-96 h-64 rounded"
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
              <p class="text-xl font-semibold">{{ item.price }}€</p>
            </div>
          </div>
          <div class="flex"></div>
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
