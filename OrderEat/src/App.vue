<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <router-link class="navbar-brand float-left" to="/"><img src="@/assets/logos/logo_black_transparent.png" class="imgNavbar"/></router-link>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/editArticle/0">Creer un Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/editArticle/0">Creer un article</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/viewArticle">Voir mes articles</router-link>
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
  import ApiService from "./services/apiService"
  import { mapMutations, mapState, mapActions  } from 'vuex'

  export default Vue.extend({
       async created() {
        
        //CHECK IF TOKEN IS VALID
        let auth_token = localStorage.getItem('AUTH_TOKEN')
        
        if(auth_token !== undefined){
          let apiService = new ApiService()
          let apiURL = 'check-user';
          console.log('app created')
          let res = await apiService.getCall(apiURL, auth_token, true)
          console.log(res.isLoggedIn)
          if(res.isLoggedIn && !this.isLoggedIn){
            console.log(res)
            this.updateUserInfo(res)
            this.toggle(true)
          } else if(this.isLoggedIn)this.toggle(false)
        } else if(this.isLoggedIn)this.toggle(false)

      },
      computed: mapState([
        // map this.count to store.state.count
        'isLoggedIn',
        'userInfo'
      ]),
      methods: {
        ...mapMutations([
          'toggle', // map `this.toggle()` to `this.$store.commit('toggle')`
          'updateUserInfo'
        ]),
        ...mapActions([
          'logout',
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