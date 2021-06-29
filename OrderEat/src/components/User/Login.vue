<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Se connecter</h3>
            <span>{{this.error}}</span>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>

                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Valider</button>
                </div>
            </form>
            <div class="text-center">
                <router-link to="sign-up" >Pas encore de compte ? Creer un compte</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import ApiService from "../../services/apiService"
    import { mapMutations  } from 'vuex'
    export default Vue.extend({
        data() {
            return {
                user: {
                   email: '',
                   password: ''
                },
                error : ''
            }
        },
        methods: {
            ...mapMutations([
                'toggleIsLoggedIn', 
                'updateUserInfo'
            ]),
           async handleSubmitForm() {
                let apiService = new ApiService()
                let apiURL = 'login-user';
                let res = await apiService.postCall(apiURL, JSON.parse(JSON.stringify(this.user)))
                console.log(res)
                if('error' in res){
                    this.error = res.error
                } else {
                    //save user info
                    this.toggleIsLoggedIn(true)
                    localStorage.setItem('AUTH_TOKEN', res.token)
                    this.updateUserInfo(res)
                    this.$router.push('/')
                }
                //
            }
        },
        created() {

        }
    })
</script>