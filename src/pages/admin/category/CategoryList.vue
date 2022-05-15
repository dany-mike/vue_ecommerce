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
      <router-link :to="`/admin/category/${category.id}`">
        <div
          class="border-solid border-2 border-slate-900 w-96 rounded-md max-w-xs mb-2 flex justify-center items-center"
        >
          <p class="text-xl">
            {{ category.name }}
          </p>
        </div>
      </router-link>
      <router-link :to="`/admin/category/update/${category.id}`">
        <div
          class="border-solid border-2 border-indigo-600 w-16 rounded-md max-w-xs mb-2 flex justify-center items-center mx-2"
        >
          <font-awesome-icon icon="edit" class="py-1.5" />
        </div>
      </router-link>
      <div
        class="border-solid border-2 border-red-600 w-16 rounded-md max-w-xs mb-2 flex justify-center items-center"
      >
        <font-awesome-icon icon="trash" class="py-1.5" />
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
