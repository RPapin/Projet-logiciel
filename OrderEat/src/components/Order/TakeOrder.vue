<template>
      <div class="row">
        <div class="col-md-12">
            <h1>Prendre une commande</h1>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Horaire de livraison estimé</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, i) in orders" :key="order._id">
                        <td>{{ order.estimation_time }}</td>
                        <td > 
                            <button class="btn btn-danger btn-block" v-on:click="takeOrder(order._id, i)">Prendre la commande</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import moment from 'moment'
  import ApiService from "../../services/apiService"
  import { mapMutations, mapState, mapActions  } from 'vuex'

  export default Vue.extend({
      data() {
        return {
            orders : [],
            reload: false
        }
      },
       async created() {
           console.log('created')
           if(!this.ordersInfo[0]){
               await setTimeout(async () => {
                  await this.prepareData()
               }, 1000)
           }
           else {
                await this.prepareData()
           }

            var channel = this.$pusher.subscribe('order');
            //event listener => new order
            channel.bind("new-order", async () => {
                console.log(`new order`);
                if(this.userInfo.role_id === 3 || this.userInfo.role_id === 2)await this.fetchOrders(this.userInfo.account_id) //client ou restaurateur
                else if(this.userInfo.role_id === 4)await this.fetchOrders()//livreur
                this.prepareData()
            });
      },
      updated () {
          console.log('updated')
      },
      computed: mapState([
        // map this.count to store.state.count
        'ordersInfo',
        'userInfo'
      ]),
      methods: {
        ...mapMutations([
          'toggleIsLoggedIn', // map `this.toggleIsLoggedIn()` to `this.$store.commit('toggleIsLoggedIn')`
          'updateUserInfo'
        ]),
        ...mapActions([
          'fetchOrders'
        ]),
        async takeOrder( order_id, i){
            const body = {
                state: "En preparation",
                livreur_id: this.userInfo.account_id
            }
            const apiService = new ApiService()
            let apiURL = 'update-order/' + order_id;
            let authToken = localStorage.getItem('AUTH_TOKEN')
            await apiService.postCall(apiURL, JSON.parse(JSON.stringify(body)), authToken)
            await this.fetchOrders()
            this.orders.splice(i, 1) 
        },
        async prepareData(){
            await this.fetchOrders()
            let ordersList = this.ordersInfo
            ordersList.forEach((order) => {
                if(order.state === 'Recherche de livreur'){
                    this.orders.push({
                        _id: order._id,
                        estimation_time: moment(order.estimation_time).format('HH:mm:ss '),
                        state: order.state
                    })
                }
            })
        }   
    }
  })  
</script>
<style >

</style>