<template>
  <div class="home-page">
    <OFullLayerImage :image="image" :text="text" />
    <OCarousel />
  </div>
</template>

<script>
import OFullLayerImage from '@/components/organisms/o-full-layer-image.vue'
import OCarousel from '@/components/organisms/o-carousel.vue'
export default {
  name: 'HomePage',
  components: {
    OFullLayerImage,
    OCarousel,
  },
  data() {
    return {
      image:
        'https://res.cloudinary.com/http-danymike-com/image/upload/v1653156656/andy-hermawan-uFdCDgnoNVI-unsplash_ittwwg.jpg',
      text: 'We are open !',
    }
  },
}
</script>
