<template>
  <!-- Todo: Make style of the button component dynamic -->
  <div class="pt-8">
    <div class="flex justify-center">
      <p class="text-4xl mb-6 pt-6">Admin Homepage</p>
    </div>
    <div class="flex justify-center mb-4">
      <router-link :to="'/admin/products'">
        <AButton :classValue="'bg-indigo-500'">
          {{ 'Manage products' }}
        </AButton>
      </router-link>
    </div>
    <div class="flex justify-center mb-4">
      <router-link :to="'/admin/category'">
        <AButton :classValue="'bg-indigo-500'">
          {{ 'Manage category' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import AButton from '@/components/atoms/a-button.vue'

export default {
  name: 'AdminHome',
  components: {
    AButton,
  },
}
</script>
