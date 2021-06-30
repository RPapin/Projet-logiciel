<template>
  <div class="container">
      <h1>Administration</h1>
      <div class="row">
        <div class="col-md-6">
            <h3>Historique de Logs</h3>
        <div>Nombre de logs : {{nbConnexion}}</div>
      <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Action</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(log, i) in connexionLog" :key="log._id">
                        <td>{{ log.value }}</td>
                        <td > 
                            {{ log.date }}
                        </td>
                        <td><button class="btn btn-danger btn-block" v-on:click="deleteLog(log._id, i)">Supprimer</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-6">
            <h3>performance des serveurs</h3>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  //import ApiService from "./services/apiService"
  import { mapMutations, mapState, mapActions  } from 'vuex'
  import ApiService from "../../services/apiService"
  import moment from 'moment'
  export default Vue.extend({
      data() {
        return {
            connexionLog: [],
            nbConnexion: 0
        }
      },
      async created() {
            const apiService = new ApiService()
            let authToken = localStorage.getItem('AUTH_TOKEN')
            let apiURL = 'get-connexion-log';
            let res = await apiService.getCall(apiURL, authToken)
            res['data'].forEach(log => {
                log.date = moment(log.date).format('DD/MM/YYYY HH:mm:ss') 
            });
            this.connexionLog = res['data']
            this.nbConnexion = res['totalLog']
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