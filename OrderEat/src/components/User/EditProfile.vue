<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Creer un compte</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-control" v-model="order.name" required>
                    <label>Prénom</label>
                    <input type="text" class="form-control" v-model="order.firstName" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="order.email" required>
                </div>
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" class="form-control" v-model="order.password" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="order.phone" required>
                </div>

                <div class="form-group">
                    <label>Code de parainage</label>
                    <input type="text" class="form-control" v-model="order.sponsorship" required>
                </div>
                <div class="form-group">
                    <label>Photo de profile</label>
                    <input type="input" class="form-control" v-model="order.profilePicture" required>
                </div>


                <div class="form-group">
                    <button class="btn btn-danger btn-block">Creer</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from "axios";
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                order: {
                   name: '',
                   email: '',
                   phone: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:4000/api/create-order';
                
                axios.post(apiURL, this.order).then(() => {
                  this.$router.push('/view')
                  this.order = {
                    name: '',
                    email: '',
                    phone: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    })
</script>