import { createStore } from 'vuex'
import categories from '@/store/modules/categories/store'

const store = createStore({
  modules: {
    categories,
  },
})

export default store
