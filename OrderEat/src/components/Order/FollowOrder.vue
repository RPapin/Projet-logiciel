<template>
      <div class="row">
        <div class="col-md-12">
            <h1>Suivi des commandes</h1>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Horaire de livraison estimé</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order._id">
                        <td>{{ order.estimation_time }}</td>
                        <td v-if="userInfo.role_id === 4" > 
                            <select type="text" class="form-control" v-model="order.state" @change="(e) => updateOrder(e, order._id)" required>
                                <option value="Recherche de livreur">Recherche de livreur</option>
                                <option value="En preparation">En preparation</option>
                                <option value="livraison en cours">livraison en cours</option>
                                <option value="Terminé">Terminé</option>
                            </select>
                        </td>
                        <td v-else>{{ order.state }}</td>
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
            orders : []
        }
      },
       async created() {
           let ordersList = []
           if(!this.ordersInfo[0]){
               await setTimeout(() => {
                   ordersList = this.ordersInfo
                   ordersList.forEach((order) => {
                    this.orders.push({
                        _id: order._id,
                        estimation_time: moment(order.estimation_time).format('HH:mm:ss '),
                        state: order.state
                    })
                })
               }, 1000)
           }
           else {
                ordersList = this.ordersInfo
                ordersList.forEach((order) => {
                    this.orders.push({
                        _id: order._id,
                        estimation_time: moment(order.estimation_time).format('HH:mm:ss '),
                        state: order.state
                    })
                })
           }

            var channel = this.$pusher.subscribe('order');
            //event listener => new order
            channel.bind("new-order", async () => {
                console.log(`new order`);
                if(this.userInfo.role_id === 3 || this.userInfo.role_id === 2)await this.fetchOrders(this.userInfo.account_id) //client ou restaurateur
                else if(this.userInfo.role_id === 4)await this.fetchOrders()//livreur
                ordersList = this.ordersInfo
                this.orders = []
                ordersList.forEach((order) => {
                this.orders.push({
                    _id: order._id,
                    estimation_time: moment(order.estimation_time).format('HH:mm:ss '),
                    state: order.state
                    })
                })
            });
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
        async updateOrder(e, order_id){
            console.log(e.target.value)
            console.log(order_id)
            const body = {
                state: e.target.value
            }
            const apiService = new ApiService()
            let apiURL = 'update-order/' + order_id;
            await apiService.postCall(apiURL, JSON.parse(JSON.stringify(body)))
        }
    }
  })  
</script>
<style >

</style>