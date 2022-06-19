import { createStore } from 'vuex'
import categories from '@/store/modules/categories/store'
import products from '@/store/modules/products/store'
import auth from '@/store/modules/auth/store'
import wishlist from '@/store/modules/wishlist/store'
import cloudinary from '@/store/modules/cloudinary/store'
import cart from '@/store/modules/cart/store'
import address from '@/store/modules/address/store'
import order from '@/store/modules/order/store'
import payment from '@/store/modules/payment/store'
import email from '@/store/modules/email/store'

const store = createStore({
  modules: {
    categories,
    products,
    auth,
    wishlist,
    cloudinary,
    cart,
    address,
    order,
    payment,
    email,
  },
})

export default store
