<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Bienvenue sur OrderEat<span v-if="this.userInfo.first_name !== undefined">, {{this.userInfo.first_name}} {{this.userInfo.last_name}}</span></h3>
        </div>
    </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import { mapMutations, mapState  } from 'vuex'

  export default Vue.extend({
      created() {

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
    }
  })  
</script>
