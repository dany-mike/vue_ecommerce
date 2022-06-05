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
  },
  {
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory,
  },
  {
    path: '/admin/category/update/:id',
    name: 'UpdateCategory',
    component: UpdateCategory,
  },
  {
    path: '/admin/category',
    name: 'CategoryList',
    component: CategoryList,
  },
  {
    path: '/admin/category/:id',
    name: 'CategoryItem',
    component: CategoryItem,
  },
  {
    path: '/admin/products/add',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/admin/products/update/:id',
    name: 'UpdateProduct',
    component: UpdateProduct,
  },
  {
    path: '/admin/products',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/admin/products/:id',
    name: 'ProductItem',
    component: ProductItem,
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
  },
  {
    path: '/admin/image-list',
    name: 'ImageList',
    component: ImageList,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
  {
    path: '/checkout',
    name: 'CheckoutPage',
    component: CheckoutPage,
  },
  {
    path: '/add-address',
    name: 'AddAddress',
    component: AddAddress,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

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
