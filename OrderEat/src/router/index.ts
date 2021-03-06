import Vue from 'vue'
import VueRouter from 'vue-router'
import EditMenu from '@/components/Menu/EditMenu.vue'
import ListMenu from '@/components/Menu/ListMenu.vue'
import EditProduct from '@/components/Product/EditProduct.vue'
import ListProductClient from '@/components/Product/ListProductClient.vue'
import Cart from '@/components/User/Cart.vue'
import Home from '@/components/home.vue'
import Login from '@/components/User/Login.vue'
import SignUp from '@/components/User/SignUp.vue'
import EditProfile from '@/components/User/EditProfile.vue'
import FollowOrder from '@/components/Order/FollowOrder.vue'
import TakeOrder from '@/components/Order/TakeOrder.vue'
import AdminTable from '@/components/Admin/AdminTable.vue'
import AccountTable from '@/components/Admin/AccountTable.vue'
import AdminCommercial from '@/components/Admin/AdminCommercial.vue'
import Command from '@/components/Restaurant/Command.vue'
import HomeClient from '@/components/homeClient.vue'

// import { Route } from '../interface'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/command/:restaurantId',
    name: 'command',
    component: Command
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
    component: HomeClient
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
    path: '/edit-profile/:id',
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
  {
    path: '/take-order',
    name: 'take-order',
    component: TakeOrder
  },
  {
    path: '/admin-table',
    name: 'admin-table',
    component: AdminTable
  },
  {
    path: '/admin-commercial',
    name: 'admin-commercial',
    component: AdminCommercial
  },
  {
    path: '/account-table',
    name: 'account-table',
    component: AccountTable
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
