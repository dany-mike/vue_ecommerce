<template>
  <div class="flex w-full justify-center items-center my-8">
    <p class="font-bold text-4xl">{{ category.name }}</p>
  </div>
  <div class="flex w-full justify-center items-center">
    <p v-if="category.image">{{ category.image }}</p>
  </div>
  <div>
    <router-link :to="'/admin/category'" class="">
      <AButton class="pl-8">
        {{ 'Back' }}
      </AButton>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_CATEGORY } from '@/store/modules/categories/types'
import AButton from '@/components/atoms/a-button.vue'

export default {
  components: {
    AButton,
  },
  name: 'CategoryItem',
  mounted() {
    this.$store.dispatch(`${FETCH_CATEGORY}`, this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      category: 'getCategoryResponse',
    }),
  },
}
</script>
