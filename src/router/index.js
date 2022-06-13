import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AdminHome from '@/pages/admin/AdminHome.vue'
import AddCategory from '@/pages/admin/category/AddCategory.vue'
import UpdateCategory from '@/pages/admin/category/UpdateCategory.vue'
import CategoryList from '@/pages/admin/category/CategoryList.vue'
import CategoryItem from '@/pages/admin/category/CategoryItem.vue'
import AddProduct from '@/pages/admin/product/AddProduct.vue'
import UpdateProduct from '@/pages/admin/product/UpdateProduct.vue'
import ProductList from '@/pages/admin/product/ProductList.vue'
import ProductItem from '@/pages/admin/product/ProductItem.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import CartPage from '@/pages/CartPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import SigninPage from '@/pages/SigninPage.vue'
import AddWishlistItem from '@/pages/AddWishlistItem.vue'
import AddImage from '@/pages/admin/uploadImage/AddImage.vue'
import ImageList from '@/pages/admin/uploadImage/ImageList.vue'
import NotFound from '@/pages/NotFound.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import AddAddress from '@/pages/AddAddress.vue'
import UpdateAddress from '@/pages/UpdateAddress.vue'
import AddOrder from '@/pages/AddOrder.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import MyAccount from '@/pages/MyAccount.vue'

import { parseJwt } from '@/helpers/parseJwt'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/category/update/:id',
    name: 'UpdateCategory',
    component: UpdateCategory,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/category',
    name: 'CategoryList',
    component: CategoryList,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/category/:id',
    name: 'CategoryItem',
    component: CategoryItem,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/products/add',
    name: 'AddProduct',
    component: AddProduct,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/products/update/:id',
    name: 'UpdateProduct',
    component: UpdateProduct,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/products',
    name: 'ProductList',
    component: ProductList,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/products/:id',
    name: 'ProductItem',
    component: ProductItem,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/products/:id',
    name: 'ProductPage',
    component: ProductPage,
  },
  {
    path: '/category/:categoryId',
    name: 'CategoryPage',
    component: CategoryPage,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path: '/favorites',
    name: 'FavoritesPage',
    component: FavoritesPage,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/signin',
    name: 'SigninPage',
    component: SigninPage,
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage,
  },
  {
    path: '/wishlist/:userId/:productId',
    name: 'AddWishlistItem',
    component: AddWishlistItem,
  },
  {
    path: '/admin/upload-image',
    name: 'AddImage',
    component: AddImage,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/admin/image-list',
    name: 'ImageList',
    component: ImageList,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
  {
    path: '/checkout/:id',
    name: 'CheckoutPage',
    component: CheckoutPage,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/add-address',
    name: 'AddAddress',
    component: AddAddress,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/update-address/:id',
    name: 'UpdateAddress',
    component: UpdateAddress,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/add-order',
    name: 'AddOrder',
    component: AddOrder,
  },
  {
    path: '/payment/:orderId',
    name: 'PaymentPage',
    component: PaymentPage,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    beforeEnter: [isTokenValid],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

function isTokenValid(to, from, next) {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    const jwtPayload = parseJwt(user.accessToken)
    if (jwtPayload.exp < Date.now() / 1000) {
      localStorage.removeItem('user')
      next('/signin')
    }
    if (jwtPayload.exp > Date.now() / 1000) {
      next()
    }
  }
}

// use this function for the future front
// async function handleRouterGuard(to, store, fullPath) {
//   if (store.state.auth.currentUser.length === 0 && to.name !== 'SigninPage') {
//     router.onError((err) => console.log(err))
//     router.push('/signin')
//   } else {
//     router.push(fullPath)
//   }
// }

// router.beforeEach(async (to, from) => {
//   store.dispatch(GET_CURRENT_USER)
//   await handleRouterGuard(to, store, to.fullPath)
// })

export default router
