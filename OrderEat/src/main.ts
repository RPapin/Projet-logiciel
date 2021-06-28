import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    userInfo: {}
  },
  mutations: {
    toggle (state, isLogged) {
      state.isLoggedIn = isLogged
    },
    updateUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
