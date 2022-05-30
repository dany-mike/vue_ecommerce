<template>
  <div class="m-product-info mt-10 px-4 sm:px-0 sm:mt-16 lg:my-auto">
    <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.name }}</h1>

    <div class="mt-3">
      <h2 class="sr-only">Product information</h2>
      <p class="text-3xl text-gray-900">{{ product.price }}€</p>
    </div>
    <div class="mt-6">
      <h3 class="sr-only">Description</h3>

      <div class="text-base text-gray-700 space-y-6">
        <p>
          {{ product.description }}
        </p>
      </div>
      <AProductCta :product="product" />
    </div>
  </div>
</template>

<script>
import AProductCta from '@/components/atoms/a-product-cta.vue'
export default {
  name: 'MProductInfo',
  components: {
    AProductCta,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>
