<template>
  <div class="o-carousel">
    <div class="o-carousel-desktop">
      <carousel :items-to-show="2.5" class="o-carousel">
        <slide v-for="slide in 10" :key="slide">
          <MProductCard />
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <div class="o-carousel-mobile overflow-x-auto">
      <MProductCard />
      <MProductCard />
      <MProductCard />
      <MProductCard />
      <MProductCard />
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
    items: {
      type: Array,
      default: () => [],
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
