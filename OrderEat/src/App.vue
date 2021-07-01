<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <router-link class="navbar-brand float-left" to="/"><img src="@/assets/logos/logo_black_transparent.png" class="imgNavbar"/></router-link>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link v-if="this.seeMenu.includes(this.userInfo.role_name)" class="nav-link pr-3" to="/editProduct/0">Creer un Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="this.seeMenu.includes(this.userInfo.role_name)" class="nav-link pr-3" to="/editProduct/0">Creer un produit</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="this.seeProduct.includes(this.userInfo.role_name)" class="nav-link pr-3" to="/viewProduct">Voir les produits</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="this.seeCart.includes(this.userInfo.role_name)" class="nav-link pr-3 notif-container" to="/cart" >Voir mon panier<span v-if="this.clientCart.length !== 0" class="notif">{{this.clientCart.length}}</span></router-link>
          </li>
          <li class="nav-item">
            <router-link  v-if="this.seeTakeOrder.includes(this.userInfo.role_name)" class="nav-link pr-3 notif-container" to="/take-order" >Prendre une livraison<span v-if="this.takeOrderInfo.length !== 0" class="notif">{{this.takeOrderInfo.length}}</span></router-link>
          </li>
           <li class="nav-item">
            <router-link  v-if="this.seeOrder.includes(this.userInfo.role_name)" class="nav-link pr-3 notif-container" to="/follow-orders" >Suivre les commandes<span v-if="this.ordersInfo.length !== 0" class="notif">{{this.ordersInfo.length}}</span></router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="this.seeAdmin.includes(this.userInfo.role_name)" class="nav-link pr-3" to="/admin-table">Tableau d'Administration</router-link>
            <router-link v-if="this.seeAdminCommercial.includes(this.userInfo.role_name)" class="nav-link pr-3" to="/admin-commercial">Tableau d'Administration</router-link>
          </li>
          <li v-if="this.seeAdminCommercial.includes(this.userInfo.role_name)" class="nav-item">
            <router-link class="nav-link pr-3" to="account-table">Gestion des comptes</router-link>
          </li>
          <li v-if="this.isLoggedIn" class="nav-item">
            <router-link class="nav-link pr-3" to="edit-profile">Editer mon profile</router-link>
          </li>
          <li v-if="this.isLoggedIn" class="nav-item">
            <a class="nav-link" v-on:click="this.logout">Se déconnecter</a>
          </li>
          <li v-if="!this.isLoggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">Se connecter</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';

  //import ApiService from "./services/apiService"
  import { mapMutations, mapState, mapActions  } from 'vuex'

  export default Vue.extend({
      data() {
        return {
          seeMenu : ['admin', 'restaurateur'],
          seeProduct : ['admin', 'restaurateur', 'client'],
          seeCart : ['admin', 'client'],
          seeTakeOrder : ['livreur'],
          seeOrder : ['admin', 'restaurateur', 'client', 'livreur', 'commercial'],
          seeAdmin : ['technique'],
          seeAdminCommercial : ['commercial'],
          takeOrderInfo : []
        }
      },
      async created() {
        await this.checkUser()
        if(this.userInfo.role_id === 3 )await this.fetchOrders(this.userInfo.account_id) //client 
        else if(this.userInfo.role_id === 4 || this.userInfo.role_id === 2 || this.userInfo.role_id === 5){
          await this.fetchOrders()//livreur ou restaurateur ou service commerciale
          this.ordersInfo.forEach(order => {
            if(order.state === "Recherche de livreur"){
              this.takeOrderInfo.push(order)
            }
          });
        }
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
        ])
    }
  })  
</script>
<style >

.imgNavbar {
  width: 80px;
}
.nav-link{
  cursor: pointer;
}
.notif-container {
  position: relative;
}
.notif{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 30px;
  line-height: 30px;
  font-size: 16px;
  top: -10px;
  right: 0px;
  background-color: #FF6B6B;
  border: 2px solid #FFF;
  color: #FFF;
}
</style>