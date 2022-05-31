<template>
  <div class="flex flex-col-reverse">
    <div class="w-full aspect-w-1 aspect-h-1">
      <div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
        <img
          :src="imageUrl(product)"
          alt="Angled front view with bag zipped and handles upright."
          class="w-full h-full object-center object-cover sm:rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MProductImage',
  components: {},
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    imageUrl(product) {
      const imageUrl = product.image
        ? product.image
        : 'https://res.cloudinary.com/http-danymike-com/image/upload/v1654028697/ecommerce/marcus-ganahl-W5qgKZj-qnk-unsplash_h2vxby.jpg'
      return imageUrl
    },
  },
}
</script>
