<template>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <img class="img-rounded img-responsive" alt="Photo de profile" :src="this.user.picture_profil"/>
        </div>
        <div class="col-md-4">
            <h3 class="text-center">Creer un compte</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-control" v-model="user.last_name" required>
                    <label>Prénom</label>
                    <input type="text" class="form-control" v-model="user.first_name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="user.phone_number" required>
                </div>

                <div class="form-group">
                    <label>Code de parainage</label>
                    <input type="text" class="form-control" v-model="user.sponsorship" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Creer</button>
                </div>
            </form>
            <div class="form-group">
                <button class="btn btn-danger btn-block" v-on:click="deleteAccount">Supprimer mon compte</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { mapMutations, mapState, mapActions } from 'vuex'
    import ApiService from "../../services/apiService"
    export default Vue.extend({
        data() {
            return {
                user: {}
            }
        },
        methods: {
            async handleSubmitForm() {
                console.log(this.user)
                const service = new ApiService()
                let apiURL = 'edit-user';
                let authToken = localStorage.getItem('AUTH_TOKEN')
                let res = await service.postCall(apiURL, this.user, authToken);
                console.log('after edit res ' + res)
            },
            async deleteAccount(){
                const service = new ApiService()
                let apiURL = 'delete-user';
                let authToken = localStorage.getItem('AUTH_TOKEN')
                let res = await service.postCall(apiURL, this.user, authToken);
                this.logout()
                console.log(res.message)
            },
            ...mapMutations([
            'toggle', // map `this.toggle()` to `this.$store.commit('toggle')`
            'updateUserInfo'
            ]),
            ...mapActions([
                'logout',
            ])
        },
        computed: mapState([
            // map this.count to store.state.count
            'isLoggedIn',
            'userInfo'
            ]),
        created() {
            setTimeout(() => {
                this.user = this.userInfo
                console.log(this.user)
                console.log(this.user.picture_profil)
            }, 500)
        }
        })
</script>