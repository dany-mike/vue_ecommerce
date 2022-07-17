import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import CartPage from '@/pages/CartPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import SigninPage from '@/pages/SigninPage.vue'
import AddWishlistItem from '@/pages/AddWishlistItem.vue'
import NotFound from '@/pages/NotFound.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import AddAddress from '@/pages/AddAddress.vue'
import UpdateAddress from '@/pages/UpdateAddress.vue'
import AddOrder from '@/pages/AddOrder.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import MyAccount from '@/pages/MyAccount.vue'
import SuccessPage from '@/pages/SuccessPage.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
import ImprintPage from '@/pages/ImprintPage.vue'

import { parseJwt } from '@/helpers/parseJwt'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/products/:id',
    name: 'ProductPage',
    component: ProductPage,
  },
  {
    path: '/category/:categoryName',
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
  {
    path: '/success/:orderId',
    name: 'SuccessPage',
    component: SuccessPage,
    beforeEnter: [isTokenValid],
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/auth/reset',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/imprint',
    name: 'ImprintPagePage',
    component: ImprintPage,
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

export default router
