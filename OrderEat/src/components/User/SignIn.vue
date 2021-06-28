<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Creer un compte</h3>
            <form @submit.prevent="handleSubmitForm" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-control" v-model="user.name" >
                    <label>Prénom</label>
                    <input type="text" class="form-control" v-model="user.firstName" >
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" >
                </div>
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" class="form-control" v-model="user.password" >
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="number" class="form-control" v-model="user.phone" >
                </div>
                <div class="form-group">
                    <label>Code de parainage</label>
                    <input type="text" class="form-control" v-model="user.sponsorship">
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
    import UploadImage from 'vue-upload-drop-images/dist/vue-upload-drop-images.vue';
    import FormData from 'form-data'

    export default Vue.extend({
        data() {
            return {
                user: {
                   firstName: '',
                   name: '',
                   email: '',
                   password: '',
                   phone: '',
                   sponsorship: '',
                   
                },
                profilePicture: ''
            }
        },
        methods: {
            handleSubmitForm() {
                
                let apiURL = 'http://localhost:4000/api/create-user';
                
                const formData = new FormData();
                formData.append('data', JSON.stringify(this.user))
                if(this.profilePicture !== '')formData.append('file', this.profilePicture, this.profilePicture.name);
                axios.post(apiURL, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    }
                }).then((res) => {
                    this.toggle(true)
                    localStorage.setItem('AUTH_TOKEN', res.data.token)
                    this.updateUserInfo(res)
                    this.$router.push('/')
                }).catch(error => {
                    console.log(error)
                });
            

            },
            handleImages(files) {
                this.profilePicture = files[0]
            }
        },
        components: {
            UploadImage
        }
    })
</script>