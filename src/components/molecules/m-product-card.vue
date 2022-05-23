<template>
  <div class="m-product-card px-24 o-padding-mobile">
    <router-link :to="`/products/${item.id}`">
      <div class="py-6">
        <div class="flex bg-white shadow-lg rounded-lg overflow-hidden h-64 o-card-width-mobile">
          <div
            class="w-1/3 bg-cover"
            style="
              background-image: url('https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80');
            "
          ></div>
          <div class="w-2/3 p-10">
            <h1 class="text-gray-900 font-bold text-2xl">{{ item.name }}</h1>
            <p class="mt-2 text-gray-600 text-sm">
              {{ item.description }}
            </p>
            <div class="flex item-center justify-between mt-3">
              <h1 class="text-gray-700 font-bold text-xl">{{ item.price }}€</h1>
              <button class="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                Consult
              </button>
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
}
</script>

<style scoped>
@media (max-width: 1380px) {
  .o-card-width-mobile {
    width: 400px;
  }

  .o-padding-mobile {
    padding: 30px;
  }
}
</style>
