import { createStore } from 'vuex'
import categories from '@/store/modules/categories/store'
import products from '@/store/modules/products/store'
import auth from '@/store/modules/auth/store'

const store = createStore({
  modules: {
    categories,
    products,
    auth,
  },
})

export default store
