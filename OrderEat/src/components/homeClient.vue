<template>
  <div>
    <div class="row border border-primary rounded m-2" v-for="restaurant in Restaurants" :key="restaurant._id">
      <div class="col-md-12">
        <h4>{{ restaurant.name }}</h4>
      </div>
      <div class="col-md-6">
        <p>{{ restaurant.description }}</p>
        <small>{{ restaurant.address }}</small>
      </div>
      <div class="col-md-6">
        <img :src="restaurant.picture" class="img-thumbnail" alt="">
        <small class="text-success">{{ restaurant.tags }}</small>
      </div>
      <div class="col-md-12">
        <router-link :to="'command/' + restaurant._id" class="btn btn-success">Commander</router-link>
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
