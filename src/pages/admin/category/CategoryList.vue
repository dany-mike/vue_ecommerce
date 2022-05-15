<template>
  <div class="category-list">
    <div class="flex justify-center">
      <p class="text-4xl mb-6 pt-6">Category list</p>
    </div>
    <div
      :key="category.id"
      v-for="category in categories"
      class="w-full flex justify-center items-center"
    >
      <div
        class="border-solid border-2 border-red-500 w-64 rounded-md max-w-xs mb-2 flex justify-center items-center"
      >
        <p class="text-xl">
          {{ category.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_CATEGORIES } from '@/store/modules/categories/types'

export default {
  name: 'CategoryList',
  mounted() {
    this.$store.dispatch(`${FETCH_CATEGORIES}`)
  },
  computed: {
    ...mapGetters({
      categories: 'getCategoryResponse',
    }),
  },
}
</script>
