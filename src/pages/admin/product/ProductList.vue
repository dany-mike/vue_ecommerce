<template>
  <div class="product-list">
    <div class="flex justify-center">
      <p class="text-4xl mb-6 pt-6">Products list</p>
    </div>
    <MAdminList :items="products" :type="'product'" />
    <div class="flex justify-center mt-8">
      <router-link :to="'/admin/products/add'">
        <AButton :background-color="'bg-indigo-500'">
          {{ 'Add new product' }}
        </AButton>
      </router-link>
    </div>
    <div>
      <router-link :to="'/admin'">
        <AButton class="ml-8" :backgroundColor="'bg-red-500'">
          {{ 'Back' }}
        </AButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import MAdminList from '@/components/molecules/m-admin-list.vue'
import { mapGetters } from 'vuex'
import { FETCH_PRODUCTS } from '@/store/modules/products/types'
import AButton from '@/components/atoms/a-button.vue'

export default {
  components: {
    MAdminList,
    AButton,
  },
  mounted() {
    this.$store.dispatch(`${FETCH_PRODUCTS}`)
  },
  computed: {
    ...mapGetters({
      products: 'getProductResponse',
    }),
  },
  name: 'ProductList',
  methods: {},
}
</script>
