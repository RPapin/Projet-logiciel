<template>
  <div class="container">
      <h1>Administration commercial</h1>
      <div class="row">
        <div class="col-md-12">
            <h3>Gestion des comptes clients</h3>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Crédit de sponsorisation</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(client, i) in clientAccount" :key="client.account_id">
                        <td>{{ client.last_name }}</td>
                        <td > 
                            {{ client.first_name }}
                        </td>
                        <td > 
                            {{ client.sponsorship_credit }}
                        </td>
                        <td > 
                            <router-link :to="'edit-profile/' +  client.account_id"><button class="btn btn-primary btn-block ">Editer</button></router-link>
                            <button class="btn btn-danger btn-block mt-2" v-on:click="deleteAccount(client, i)">Supprimer</button>
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
            clientAccount: []
        }
      },
      async created() {
          setTimeout(async () => {
            const apiService = new ApiService()
            let authToken = localStorage.getItem('AUTH_TOKEN')
            let apiURL = 'get-client-account';
            let res = await apiService.getCall(apiURL, authToken)
            console.log(res)
            this.clientAccount = res
          }, 100)

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
        async deleteAccount( client, i){
            const apiService = new ApiService()
            let authToken = localStorage.getItem('AUTH_TOKEN')
            let apiURL = 'delete-user';
            await apiService.postCall(apiURL, client, authToken)
            this.clientAccount.splice(i, 1) 
        },
    }
  })  
</script>
<style >

</style>