<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Creer un compte</h3>
            <form @submit.prevent="handleSubmitForm" enctype="multipart/form-data">
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
                    <input type="number" class="form-control" v-model="user.phone_number" required>
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <select class="form-control" id="exampleFormControlSelect2" v-model="user.role_id" required>
                        <option v-for="role in this.role_list" :key="role.role_id" :value="role.role_id">{{role.role_name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Code de parainage</label>
                    <input type="text" class="form-control" v-model="user.sponsorship_on_sign_up">
                </div>
                <div class="form-group">
                    <label>Photo de profile</label>
                    <UploadImage :max="1" @change="handleImages" maxError="Une seule image est autorisée" uploadMsg="Choisir une photo de profile" clearAll="Supprimer l'image"/>
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
    import { mapMutations } from 'vuex'
    import UploadImage from 'vue-upload-drop-images/dist/vue-upload-drop-images.vue';
    import FormData from 'form-data'
    import ApiService from "../../services/apiService"

    export default Vue.extend({
        data() {
            return {
                user: {
                   first_name: '',
                   last_name: '',
                   email: '',
                   password: '',
                   phone_number: '',
                   sponsorship_on_sign_up: '',
                   role_id:null
                },
                picture_profil: '',
                role_list: {}
            }
        },
        methods: {
            ...mapMutations([
                'toggle', // map `this.toggle()` to `this.$store.commit('toggle')`
                'updateUserInfo'
            ]),
            handleSubmitForm() {
                let apiURL = 'http://localhost:4000/api/create-user';
                const formData = new FormData();
                formData.append('data', JSON.stringify(this.user))
                if(this.picture_profil !== '')formData.append('file', this.picture_profil, this.picture_profil.name);
                axios.post(apiURL, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    }
                }).then((res) => {
                    this.toggle(true)
                    localStorage.setItem('AUTH_TOKEN', res.data.token)
                    //this.updateUserInfo(this.user)
                    this.$router.push('/')
                }).catch(error => {
                    console.log(error)
                });
            },
            handleImages(files) {
                this.picture_profil = files[0]
            }
        },
        components: {
            UploadImage
        },
        async created() {
            const service = new ApiService()
            let apiURL = 'get-roles';
            let res = await service.getCall(apiURL);
            this.role_list = res
        }
    })
</script>