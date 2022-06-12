<template>
  <div class="home-page">
    <OFullLayerImage :image="image" :text="text" />
    <OProductCarousel class="px-8 mt-12" :products="products" :title="title" />
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
    this.$store.dispatch(`${FETCH_PRODUCTS}`)
  },
  computed: {
    ...mapGetters({
      products: 'getProductResponse',
    }),
  },
}
</script>
