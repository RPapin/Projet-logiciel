import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateComponent from '../components/CreateComponent.vue'
import EditComponent from '../components/EditComponent.vue'
import ListComponent from '../components/ListComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CreateComponent
  },
  {
    path: '/view',
    name: 'view',
    component: ListComponent
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
