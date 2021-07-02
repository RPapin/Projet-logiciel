<template>
      <div class="row">
        <div class="col-md-12">
            <h1>Suivi des commandes</h1>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Horaire de livraison estimé</th>
                        <th>Statut</th>
                        <th>Articles </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, i) in orders" :key="order._id">
                        <td>{{ order.estimation_time }}</td>
                        <!-- LIVREUR -->
                        <td v-if="userInfo.role_id === 4" > 
                            <select type="text" class="form-control"  @change="(e) => updateOrder(e, order._id, i)" :value="order.state"  required :disabled="seeLivreurSelect.includes(order.state)">
                                <option value="En preparation" disabled>En preparation</option>
                                <option value="En attente du livreur" disabled>En attente du livreur</option>
                                <option value="livraison en cours">livraison en cours</option>
                                <option value="Terminé">Terminé</option>
                            </select>
                        </td>
                        <!-- RESTO -->
                        <td v-else-if="userInfo.role_id === 2" > 
                            <select type="text" class="form-control"  @change="(e) => updateOrder(e, order._id, i)" :value="order.state"  required :disabled="seeRestoSelect.includes(order.state)">
                                <option value='Recherche de livreur' disabled>Recherche de livreur</option>
                                <option value="En preparation">En preparation</option>
                                <option value="En attente du livreur">En attente du livreur</option>
                                <option value="Terminé" disabled>Terminé</option>
                            </select>
                        </td>
                        <!-- COMMERCIAL -->
                        <td v-else-if="userInfo.role_id === 5" > 
                            <select type="text" class="form-control"   :value="order.state" @change="(e) => updateOrder(e, order._id, i)">
                                <option value='Recherche de livreur'>Recherche de livreur</option>
                                <option value="En preparation">En preparation</option>
                                <option value="En attente du livreur" >En attente du livreur</option>
                                <option value="livraison en cours">livraison en cours</option>
                                <option value="Terminé">Terminé</option>
                            </select>
                        </td>
                        <td v-else>{{ order.state }}</td>
                        <td>
                            <div v-for="item in order.items" :key="item._id">
                                {{item.quantity}}  {{item.item_name}} 
                            </div>
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
            reload: false,
            seeLivreurSelect : ['Terminé', "En preparation"],
            seeRestoSelect : ['Terminé', "En attente du livreur", "livraison en cours", 'Recherche de livreur'],

        }
      },
       async created() {
           console.log('created')
           if(!this.ordersInfo[0]){
               await setTimeout(async () => {
                   await this.prepareData()
               }, 100)
           }
           else {
                this.prepareData()
           }

            var channel = this.$pusher.subscribe('order');
            //event listener => new order
            channel.bind("new-order", async () => {
                await this.prepareData()
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
        async updateOrder(e, order_id, i){
            console.log(e)
            if(e.target.value === 'Terminé'){
                if(!confirm("Etes vous sur de vouloir terminer la livraison ?")){
                    e.target.value = this.orders[i].state
                    return false
                }
            }
            console.log('true')
            this.orders[i].state = e.target.value
            const body = {
                state: e.target.value
            }
            const apiService = new ApiService()
            let apiURL = 'update-order/' + order_id;
            let authToken = localStorage.getItem('AUTH_TOKEN')
            await apiService.postCall(apiURL, JSON.parse(JSON.stringify(body)), authToken)
            await this.fetchOrders()
        },
        async prepareData(){
            if(this.reload === false){
                this.reload = true
                await this.fetchOrders()
                let ordersList = this.ordersInfo
                console.log(ordersList)
                ordersList.forEach((order) => {
                    if(this.userInfo.role_name === 'livreur'){
                        if(order.livreur_id === this.userInfo.account_id.toString() && order.state !== 'Recherche de livreur'){
                            let result = this.orders.find(({ _id }) => _id === order._id )
                            if(result === undefined){
                                this.orders.push({
                                    _id: order._id,
                                    estimation_time: moment(order.estimation_time).format('HH:mm:ss'),
                                    state: order.state,
                                    items: order.order_item
                                })
                            }
                        }
                    } else if(this.userInfo.role_name === 'client' && order.client_id === this.userInfo.account_id){
                        this.orders.push({
                                _id: order._id,
                                estimation_time: moment(order.estimation_time).format('HH:mm:ss'),
                                state: order.state,
                                items: order.order_item
                            })
                    } else if(this.userInfo.role_name === 'restaurateur' && order.manager_id === this.userInfo.account_id){
                        console.log(order.order_item)
                        this.orders.push({
                                _id: order._id,
                                estimation_time: moment(order.estimation_time).format('HH:mm:ss'),
                                state: order.state,
                                items: order.order_item
                            })
                    } else if(this.userInfo.role_name === 'commercial'){
                        this.orders.push({
                            _id: order._id,
                            estimation_time: moment(order.estimation_time).format('HH:mm:ss'),
                            state: order.state,
                            items: order.order_item
                        })
                    }
                })
            }  
        }
    }
  })  
</script>
<style >

</style>