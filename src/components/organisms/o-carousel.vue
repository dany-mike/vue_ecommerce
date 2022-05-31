<template>
  <div class="o-carousel">
    <p class="text-2xl">{{ title }}</p>
    <div class="o-carousel-desktop">
      <carousel :items-to-show="3" class="o-carousel">
        <slide v-for="product in products" :key="product.id">
          <MProductCard :item="product" />
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <!-- Add an index to fix integration of the first iteration -->
    <div class="o-carousel-mobile overflow-x-auto">
      <MProductCard v-for="product in products" :key="product.id" :item="product" />
    </div>
  </div>
</template>

<script>
import MProductCard from '../molecules/m-product-card.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  components: {
    MProductCard,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  name: 'OCarousel',
  props: {
    products: {
      type: [Array, Object],
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.o-carousel-mobile {
  display: none;
}

@media (max-width: 1380px) {
  .o-carousel-desktop {
    display: none;
  }
}

@media (max-width: 1380px) {
  .o-carousel-mobile {
    display: flex;
  }
}
</style>
