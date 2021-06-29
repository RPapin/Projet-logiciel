import Vue from 'vue'
import VueRouter from 'vue-router'
import EditMenu from '@/components/Menu/EditMenu.vue'
import ListMenu from '@/components/Menu/ListMenu.vue'
import EditProduct from '@/components/Product/EditProduct.vue'
import ListProduct from '@/components/Product/ListProduct.vue'
import ListProductClient from '@/components/Product/ListProductClient.vue'
import Cart from '@/components/User/Cart.vue'
import Home from '@/components/home.vue'
import Login from '@/components/User/Login.vue'
import SignUp from '@/components/User/SignUp.vue'
import EditProfile from '@/components/User/EditProfile.vue'
import FollowOrder from '@/components/Order/FollowOrder.vue'
// import { Route } from '../interface'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/viewMenu',
    name: 'viewMenu',
    component: ListMenu
  },
  {
    path: '/editMenu/:id',
    name: 'editMenu',
    component: EditMenu
  },
  {
    path: '/viewProduct',
    name: 'viewProduct',
    component: ListProduct
  },
  {
    path: '/viewProductsClient',
    name: 'viewProductsClient',
    component: ListProductClient
  },
  {
    path: '/editProduct/:id',
    name: 'editProduct',
    component: EditProduct
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditProfile
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/follow-orders',
    name: 'follow-orders',
    component: FollowOrder
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

//TODO ADD AUTH ROUTE
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && "!isAuthenticated") next({ name: 'Login' })
//   else next()
// })
export default router
