<template>
  <div>
    <div class="flex justify-center">
      <p class="text-2xl mt-10">Image list</p>
    </div>
    <div class="lg:px-96 px-16">
      <router-link :to="'/admin/upload-image'" class="w-full lg:px-96 px-16">
        <AButton :classValue="'bg-indigo-500 w-full'">
          {{ 'Add a new image' }}
        </AButton>
      </router-link>
    </div>
    <div class="lg:px-96 px-16">
      <router-link :to="'/admin'" class="w-full lg:px-96 px-16">
        <AButton :classValue="'bg-red-500 w-full'">
          {{ 'Back' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'
export default {
  name: 'ImageList',
  components: {
    AButton,
  },
}
</script>
