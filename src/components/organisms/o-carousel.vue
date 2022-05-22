<template>
  <div class="o-carousel">
    <MProductCard />
  </div>
</template>

<script>
import MProductCard from '../molecules/m-product-card.vue'
export default {
  components: { MProductCard },
  name: 'OCarousel',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
