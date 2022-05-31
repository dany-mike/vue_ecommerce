import { createStore } from 'vuex'
import categories from '@/store/modules/categories/store'
import products from '@/store/modules/products/store'
import auth from '@/store/modules/auth/store'
import wishlist from '@/store/modules/wishlist/store'
import cloudinary from '@/store/modules/cloudinary/store'

const store = createStore({
  modules: {
    categories,
    products,
    auth,
    wishlist,
    cloudinary,
  },
})

export default store
