import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import ApiService from "./services/apiService"
import pusher from 'vue-pusher'
 
Vue.use(pusher, {
    api_key: 'cddd1716e23bf4a29c62',
    options: {
        cluster: 'eu'
    }
});

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    userInfo: {},
    clientCart: [],
    ordersInfo: [false]
  },
  mutations: {
    toggleIsLoggedIn (state, isLogged) {
      state.isLoggedIn = isLogged
    },
    updateUserInfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    },
    updateOrdersInfo(state, newOrdersInfo){
      state.ordersInfo = newOrdersInfo
    },
    updateCart(state, newCart){
      let indexToRemove = []
      newCart.forEach((element) => {
        console.log(element.quantity)
        if(element.quantity === 0)indexToRemove.push(element)
      });
      newCart = newCart.filter( ( el ) => !indexToRemove.includes( el ) );
      state.clientCart = newCart
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
        console.log('checkuser is logggin ' + res.isLoggedIn)
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
    },
    async fetchOrders({commit}, account_id = null) {
      let auth_token = localStorage.getItem('AUTH_TOKEN')
      console.log(auth_token)
      if(auth_token !== undefined){
        let apiService = new ApiService()
        let apiURL = account_id === null ?'get-all-order' : 'get-order-by-id/' + account_id;
        let res = await apiService.getCall(apiURL, auth_token, true)
        commit('updateOrdersInfo', res)
        console.log(this.state.ordersInfo)
      }
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
