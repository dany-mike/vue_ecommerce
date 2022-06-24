<template>
  <div class="o-carousel">
    <p class="text-2xl font-medium">{{ title }}</p>
    <div class="o-carousel-desktop">
      <carousel :items-to-show="3" class="o-carousel" v-if="addresses.length > 0">
        <slide v-for="address in addresses" :key="address.id">
          <MAddressCard
            :item="address"
            :from="from"
            :type="type"
            @m-address-card="emitAddress"
            :is-my-account="isMyAccount"
            :addresses="addresses"
          />
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <div class="o-carousel-mobile overflow-x-auto">
      <MAddressCard
        @m-address-card="emitAddress"
        v-for="address in addresses"
        :key="address.id"
        :item="address"
        :from="from"
        :type="type"
        :is-my-account="isMyAccount"
        :addresses="addresses"
      />
    </div>
  </div>
</template>

<script>
import MAddressCard from '../molecules/m-address-card.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  components: {
    MAddressCard,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  emits: ['o-address-carousel'],
  name: 'OAddressCarousel',
  props: {
    addresses: {
      type: [Array, Object],
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    from: {
      type: String,
      default: '',
    },
    isMyAccount: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitAddress(address) {
      this.$emit('o-address-carousel', address)
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
