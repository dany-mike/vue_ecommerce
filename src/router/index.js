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
import NotFound from '@/pages/NotFound.vue'

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
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
