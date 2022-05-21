<template>
  <OFullLayerImage :image="image" :text="text" />
</template>

<script>
import OFullLayerImage from '@/components/organisms/o-full-layer-image.vue'
export default {
  name: 'HomePage',
  components: {
    OFullLayerImage,
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
