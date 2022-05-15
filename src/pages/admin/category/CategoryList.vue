<template>
  <div class="category-list">
    <div class="flex justify-center">
      <p class="text-4xl mb-6 pt-6">Category list</p>
    </div>
    <div
      :key="category.id"
      v-for="category in categories"
      class="flex justify-center border-solid border-2 border-red-500 rounded-md"
    >
      <p class="text-xl">
        {{ category.name }}
      </p>
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
