<template>
  <div class="home-page">
    <OFullLayerImage :image="image" :text="text" />
    <OProductCarousel
      v-if="products && products?.length > 0"
      class="lg:px-8 lg:mt-12"
      :products="products"
      :title="title"
    />
  </div>
</template>

<script>
import OFullLayerImage from '@/components/organisms/o-full-layer-image.vue'
import OProductCarousel from '@/components/organisms/o-product-carousel.vue'
import { mapGetters } from 'vuex'
import { FETCH_PRODUCTS } from '@/store/modules/products/types'
export default {
  name: 'HomePage',
  components: {
    OFullLayerImage,
    OProductCarousel,
  },
  data() {
    return {
      title: 'Our products',
      image:
        'https://res.cloudinary.com/http-danymike-com/image/upload/v1653156656/andy-hermawan-uFdCDgnoNVI-unsplash_ittwwg.jpg',
      text: 'We are open !',
    }
  },
  mounted() {
    this.scrollToTop()
    this.$store.dispatch(`${FETCH_PRODUCTS}`)
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
  computed: {
    ...mapGetters({
      products: 'getProductResponse',
    }),
  },
}
</script>
