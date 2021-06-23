<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Se connecter</h3>
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
    import axios from "axios";
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                user: {
                   email: '',
                   password: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:4000/api/create-user';
                
                axios.post(apiURL, this.user).then(() => {
                  this.$router.push('/view')
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    })
</script>