<template>
  <div class="o-full-layer-image">
    <img :src="image" alt="home-image" class="image" />
    <div class="centered">
      <p class="text-9xl font-bold text-black">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    image: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.o-full-layer-image {
  position: relative;
  text-align: center;
  color: white;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image {
  height: 900px;
  object-fit: cover;
  width: 100%;
}
</style>
