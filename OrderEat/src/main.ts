import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import ApiService from "./services/apiService"

Vue.config.productionTip = false


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    userInfo: {}
  },
  mutations: {
    toggleIsLoggedIn (state, isLogged) {
      state.isLoggedIn = isLogged
    },
    updateUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions : {
    logout ({commit}) {
      localStorage.setItem('AUTH_TOKEN', undefined)
      commit('updateUserInfo', {})
      commit('toggleIsLoggedIn', false)
      router.push('/')
    },
    async checkUser ({commit}) {
      //CHECK IF TOKEN IS VALID
      let auth_token = localStorage.getItem('AUTH_TOKEN')
      if(auth_token !== undefined){
        let apiService = new ApiService()
        let apiURL = 'check-user';
        let res = await apiService.getCall(apiURL, auth_token, true)
        console('checkuser is logggin ' + res.isLoggedIn)
        if(res.isLoggedIn){
          commit('updateUserInfo', res)
          commit('toggleIsLoggedIn', true)
          // this.updateUserInfo(res)
          // this.toggleIsLoggedIn(true)
        } else if(!res.isLoggedIn){
          commit('updateUserInfo', {})
          commit('toggleIsLoggedIn', false)
        }
      } else if(this.state.isLoggedIn)commit('toggleIsLoggedIn', false)
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
