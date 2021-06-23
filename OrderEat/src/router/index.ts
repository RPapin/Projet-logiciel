import Vue from 'vue'
import VueRouter from 'vue-router'
import EditMenu from '@/components/Menu/EditMenu.vue'
import ListMenu from '@/components/Menu/ListMenu.vue'
import EditArticle from '@/components/Article/EditArticle.vue'
import ListArticle from '@/components/Article/ListArticle.vue'
import Home from '@/components/home.vue'
import Login from '@/components/User/Login.vue'
import CreateProfile from '@/components/User/CreateProfile.vue'
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
    path: '/viewArticle',
    name: 'viewArticle',
    component: ListArticle
  },
  {
    path: '/editArticle/:id',
    name: 'editArticle',
    component: EditArticle
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: CreateProfile
  }
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
