<template>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <img v-if="this.user.picture_profil === 'default-profile-picture.png'" class="img-rounded img-responsive imgProfile" alt="Photo de profile"  src="@/assets/default/default-profile-picture.png"/>
            <img v-else class="img-rounded img-responsive imgProfile" alt="Photo de profile"  :src="'data:image/png;base64,' + this.user.picture_profil"/>
            
        </div>
        <div class="col-md-4">
            <h3 class="text-center">Editer mon compte</h3>
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
                    <label>Code de parainage : <span class="important-text">{{user.sponsorship}}</span></label>
                </div>
                <div class="form-group">
                    <label>Crédit de parainage : <span class="important-text">{{user.sponsorship_credit}} €</span></label>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Modifier</button>
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
                user: {
                    account_id: "",
                    last_name : "",
                    first_name : "",
                    password : "",
                    phone_number : null,
                    sponsorship_credit : "",
                    email : "",
                    picture_profil :""
                }
            }
        },
        methods: {
            async handleSubmitForm() {
                console.log(this.user)
                const service = new ApiService()
                let apiURL = 'edit-user';
                let authToken = localStorage.getItem('AUTH_TOKEN')
                await service.postCall(apiURL, this.user, authToken);
                if(this.$route.params.id !== undefined)this.$router.push('/account-table')
                else this.$router.push('/viewProduct')
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
            'toggleIsLoggedIn', 
            'updateUserInfo'
            ]),
            ...mapActions([
                'logout', 
                'checkUser'
            ])
        },
        computed: mapState([
            // map this.count to store.state.count
            'isLoggedIn',
            'userInfo'
            ]),
        async created() {
            if(this.$route.params.id !== undefined){
                const service = new ApiService()
                let apiURL = 'get-user-by-id/' + this.$route.params.id;
                console.log(apiURL)
                let authToken = localStorage.getItem('AUTH_TOKEN')
                let res = await service.getCall(apiURL, authToken);
                this.user = res
            } else {
                await this.checkUser()
                this.user = this.userInfo 
            }
            
        }
    })
</script>
<style >
.imgProfile {
  width: 300px;
}
.important-text {
    font-weight: bold;
}
</style>