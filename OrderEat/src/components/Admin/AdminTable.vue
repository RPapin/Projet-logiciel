<template>
  <div class="container">
      <h1>Administration</h1>
      <div class="row">
        <div class="col-md-4">
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
            <h3>Performance des serveurs (RAM)</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 200 100" style="border:solid 1px;">
                <path :d="svgPathString" style="fill:none; stroke:#26de81; stroke-width:1px;"/>
            </svg>
        </div>
          <div class="col-md-4">
            <h3>Utilisation de nos components</h3>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Téléchargements</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ componentInfo.collected.metadata.name }}</td>
                        <td > 
                            {{ nbDownload }}
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
  import moment from 'moment'
  import axios from "axios";
  export default Vue.extend({
      data() {
        return {
            connexionLog: [],
            nbConnexion: 0,
            componentInfo: [],
            nbDownload: 0,
            serverMemoryPerformances: [],
            svgPathString: ""
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
            let _res = await axios.get("https://api.npms.io/v2/package/%40ordereat%2Fbanner").then(res => {
              return res.data
            });
            let _ress = await axios.get("https://api.npmjs.org/downloads/point/last-month/%40ordereat%2Fbanner").then(res => {
              return res.data
            });
             console.log(_ress)
            console.log(_res)

            this.componentInfo = _res
            this.connexionLog = res['data']
            this.nbConnexion = res['totalLog']
            this.nbDownload = _ress['downloads']
        //event listener => new order
        // var channel = this.$pusher.subscribe('order');
        // channel.bind("new-order", () => {
        //   console.log(`new order`);
        //   if(this.userInfo.role_id === 3 || this.userInfo.role_id === 2)this.fetchOrders(this.userInfo.account_id) //client ou restaurateur
        //   else if(this.userInfo.role_id === 4)this.fetchOrders()//livreur
        // });


        // Server performance
        let resServPerf = await apiService.getCall('/get-server-usage-log', authToken)
        this.serverMemoryPerformances = resServPerf.data

        setInterval(async function(){
            let resServPerf = await apiService.getCall('/get-server-usage-log', authToken)
            this.serverMemoryPerformances = resServPerf.data
        }.bind(this), 5000)
        
      },
      computed: {
        ...mapState([
            // map this.count to store.state.count
            'isLoggedIn',
            'userInfo',
            'clientCart',
            'ordersInfo'
          ])
      },
      watch: {
        serverMemoryPerformances: function(){
            this.computeServerMemoryPerformancesPath()
        }
      },
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
        computeServerMemoryPerformancesPath(){
            let width = 200
            let height = 100
            let maxValue = 8000000000
            let pathString:string = ""

            if(this.serverMemoryPerformances !== undefined && this.serverMemoryPerformances.length > 0)
            {
                let minDate = this.serverMemoryPerformances[this.serverMemoryPerformances.length-1].date
                let dateInterval = this.serverMemoryPerformances[0].date-minDate

                for (var i = this.serverMemoryPerformances.length - 1; i >= 0; i--) {
                    let tempString = ""
                    if(i == this.serverMemoryPerformances.length - 1)
                    {
                        tempString += "M"
                    }
                    else
                    {
                        tempString += "L"
                    }

                    tempString += (((this.serverMemoryPerformances[i].date-minDate)/dateInterval)*width).toString()
                    tempString += " "+(height-((parseInt(this.serverMemoryPerformances[i].value)/maxValue)*height)).toString()
                    pathString += " "+tempString
                }
            }

            this.svgPathString = pathString
        }
    }
  })  
</script>
<style >

</style>