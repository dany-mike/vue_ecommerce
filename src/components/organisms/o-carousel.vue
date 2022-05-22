<template>
  <carousel :items-to-show="2.5" class="o-carousel">
    <slide v-for="slide in 10" :key="slide">
      <MProductCard />
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
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
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
