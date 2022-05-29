<template>
  <div class="flex w-full justify-center items-center my-8">
    <p class="font-bold text-4xl">{{ product.name }}</p>
  </div>
  <div class="flex w-full justify-center items-center">
    <p v-if="product.image">{{ product.image }}</p>
  </div>
  <div>
    <router-link :to="'/admin/products'">
      <AButton class="pl-8" :classValue="'bg-red-500'">
        {{ 'Back' }}
      </AButton>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_PRODUCT } from '@/store/modules/products/types'
import AButton from '@/components/atoms/a-button.vue'

export default {
  components: {
    AButton,
  },
  name: 'ProductItem',
  mounted() {
    this.$store.dispatch(`${FETCH_PRODUCT}`, this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      product: 'getProductResponse',
    }),
  },
}
</script>
