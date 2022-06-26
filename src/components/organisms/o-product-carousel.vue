<template>
  <div class="o-carousel">
    <p class="text-2xl">{{ title }}</p>
    <div class="o-carousel-desktop">
      <carousel v-if="products.length > 0" :items-to-show="itemsToShow" class="o-carousel">
        <slide v-for="product in products" :key="product.id">
          <MProductCard :item="product" />
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
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
  name: 'OProductCarousel',
  props: {
    products: {
      type: [Array, Object],
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    itemsToShow: {
      type: Number,
      default: 3,
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

:deep(.carousel__track) {
  padding-bottom: 50px !important;
}
</style>
