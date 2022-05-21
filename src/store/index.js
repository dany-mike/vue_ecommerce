import { createStore } from 'vuex'
import categories from '@/store/modules/categories/store'
import products from '@/store/modules/products/store'

const store = createStore({
  modules: {
    categories,
    products,
  },
})

export default store
