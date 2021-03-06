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
    updateCart(state, {newCart, isProduct}){
      let indexToRemove = []
      newCart.forEach((element) => {
        if(element.quantity === 0)
        {
          indexToRemove.push(element._id)
        }
        else
        {
          state.clientCart.push({
            item_id: element._id,
            item_type: (isProduct ? 'product' : 'menu'),
            quantity: element.quantity
          })
        }
      });
      state.clientCart = state.clientCart.filter( ( el ) => !indexToRemove.includes( el._id ) );
    },
    removeCart(state){
      state.clientCart = []
    }
  },
  actions : {
    async logout ({commit}) {
      let apiService = new ApiService()
      let apiURL = 'create-connexion-log'
      let token = localStorage.getItem('AUTH_TOKEN')
      await apiService.postCall(apiURL, {action : 'Deconnexion accont_id : ' + this.state.userInfo.account_id}, token)
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
      }
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
