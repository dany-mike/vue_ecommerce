import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue'
import AddCategory from '@/pages/admin/category/AddCategory.vue'
import UpdateCategory from '@/pages/admin/category/UpdateCategory.vue'
import CategoryList from '@/pages/admin/category/CategoryList.vue'
import CategoryItem from '@/pages/admin/category/CategoryItem.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
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
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
