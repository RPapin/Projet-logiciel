<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <router-link class="navbar-brand float-left" to="/"><img src="@/assets/logos/logo_black_transparent.png" class="imgNavbar"/></router-link>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/editProduct/0">Creer un Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/editProduct/0">Creer un produit</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/viewProduct">Voir mes produits</router-link>
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

       async created() {
         //this.checkUser()
      },
      computed: mapState([
        // map this.count to store.state.count
        'isLoggedIn',
        'userInfo'
      ]),
      methods: {
        ...mapMutations([
          'toggleIsLoggedIn', // map `this.toggleIsLoggedIn()` to `this.$store.commit('toggleIsLoggedIn')`
          'updateUserInfo'
        ]),
        ...mapActions([
          'logout',
          'checkUser'
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
</style>