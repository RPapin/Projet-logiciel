<template>
  <div class="container">
      <h1>Administration commercial</h1>
      <div class="row">
        <div class="col-md-6">
            <h3>Menus populaires</h3>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(menu) in menuInfo" :key="menu._id[0]">
                        <td>{{ menu._id[0] }}</td>
                        <td > 
                            {{ menu.count }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-6">
            <h3>Articles populaires</h3>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(article) in articleInfo" :key="article._id[0]">
                        <td>{{ article._id[0] }}</td>
                        <td > 
                            {{ article.count }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  //import ApiService from "./services/apiService"
  import { mapMutations, mapState, mapActions  } from 'vuex'
  import ApiService from "../../services/apiService"
  export default Vue.extend({
      data() {
        return {
            menuInfo: [],
            articleInfo: []
        }
      },
      async created() {
            const apiService = new ApiService()
            let authToken = localStorage.getItem('AUTH_TOKEN')
            let apiURL = 'get-product-popularity';
            let res = await apiService.getCall(apiURL, authToken)
            console.log(res)
            this.menuInfo = res.menu
            this.articleInfo = res.article
        //event listener => new order
        // var channel = this.$pusher.subscribe('order');
        // channel.bind("new-order", () => {
        //   console.log(`new order`);
        //   if(this.userInfo.role_id === 3 || this.userInfo.role_id === 2)this.fetchOrders(this.userInfo.account_id) //client ou restaurateur
        //   else if(this.userInfo.role_id === 4)this.fetchOrders()//livreur
        // });
        
      },
      computed: mapState([
        // map this.count to store.state.count
        'isLoggedIn',
        'userInfo',
        'clientCart',
        'ordersInfo'
      ]),
      methods: {
        ...mapMutations([
          'toggleIsLoggedIn', // map `this.toggleIsLoggedIn()` to `this.$store.commit('toggleIsLoggedIn')`
          'updateUserInfo'
        ]),
        ...mapActions([
          'logout',
          'checkUser',
          'fetchOrders'
        ]),
        async deleteLog( log_id, i){
            const apiService = new ApiService()
            let authToken = localStorage.getItem('AUTH_TOKEN')
            let apiURL = 'delete-admin/' + log_id;
            await apiService.getCall(apiURL, authToken)
            this.connexionLog.splice(i, 1) 
        },
    }
  })  
</script>
<style >

</style>