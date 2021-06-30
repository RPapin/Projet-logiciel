<template>
  <div>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Bienvenue sur OrderEat<span v-if="this.userInfo.first_name !== undefined">, {{this.userInfo.first_name}} {{this.userInfo.last_name}}</span></h3>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import ApiService from "../services/apiService"
  import { mapMutations, mapState, mapActions } from 'vuex'

export default Vue.extend({
      data() {
          return {
              Restaurants: []
          }
      },
      async created() {
        const service = new ApiService()

        let apiURL:string = 'restaurants';
        let authToken:string = localStorage.getItem('AUTH_TOKEN') === null ? "" : localStorage.getItem('AUTH_TOKEN')
        let data:any = await service.getCall(apiURL, authToken);
        this.Restaurants = data.restaurants
      },
      computed: mapState([
        // map this.count to store.state.count
        'isLoggedIn',
        'userInfo'
      ]),
      methods: {
        ...mapMutations([
          'toggleIsLoggedIn', 
          'updateUserInfo'
        ]),
        ...mapActions([
          'checkUser',
        ])
    }
  })  
</script>
