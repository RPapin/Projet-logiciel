<template>
  <div class="container">
    <ListProductClient :restaurantId="restaurant_id"/>
    <ListMenuClient :restaurantId="restaurant_id"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import ApiService from "../../services/apiService"
  import { mapMutations, mapState, mapActions } from 'vuex'
  import ListProductClient from '../Product/ListProductClient.vue'
  import ListMenuClient from '../Menu/ListMenuClient.vue'

export default Vue.extend({
      data() {
          return {
              restaurant_id : null
          }
      },
      async created() {
        this.restaurant_id = this.$route.params.restaurantId
        
        const service = new ApiService()
        let apiURL:string = 'restaurants';
        let authToken:string = localStorage.getItem('AUTH_TOKEN') === null ? "" : localStorage.getItem('AUTH_TOKEN')
        let data:any = await service.getCall(apiURL, authToken);
        this.Restaurants = data.restaurants
      },
      components: {
        ListProductClient,
        ListMenuClient
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
