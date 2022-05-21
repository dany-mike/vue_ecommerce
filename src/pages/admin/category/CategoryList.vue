<template>
  <div class="category-list">
    <div class="flex justify-center">
      <p class="text-4xl mb-6 pt-6">Category list</p>
    </div>
    <MAdminList :items="categories" :type="'category'" />
    <div class="flex justify-center mt-8">
      <router-link :to="'/admin/category/add'" class="">
        <AButton class="pl-8">
          {{ 'Add new category' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import MAdminList from '@/components/molecules/m-admin-list.vue'
import { mapGetters } from 'vuex'
import { FETCH_CATEGORIES } from '@/store/modules/categories/types'
import AButton from '@/components/atoms/a-button.vue'

export default {
  components: {
    MAdminList,
    AButton,
  },
  mounted() {
    this.$store.dispatch(`${FETCH_CATEGORIES}`)
  },
  computed: {
    ...mapGetters({
      categories: 'getCategoryResponse',
    }),
  },
  name: 'CategoryList',
  methods: {},
}
</script>
