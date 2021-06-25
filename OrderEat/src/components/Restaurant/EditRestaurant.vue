<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Créer un restaurant</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Addresse</label>
                    <input type="text" class="form-control" v-model="restaurant.address" required>
                </div>

                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-control" v-model="restaurant.name" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" v-model="restaurant.description" required>
                </div>

                <div class="form-group">
                    <label>Tags</label>
                    <input type="text" class="form-control" v-model="restaurant.tags" placeholder="Ex : asian chicken traditional" required>
                </div>

                <div class="form-group">
                    <label>Image</label>      
                     <!-- <input type="file" class="form-control" accept="image/*" @change="handleImages($event)"> -->
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Créer</button>
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
                restaurant: {
                   address: '',
                   name: '',
                   description: '',
                   tags:'',
                   picture:''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/create-restaurant';
                
                axios.post(apiURL, this.menu).then(() => {
                  this.$router.push('/view')
                  this.restaurant = {
                       address: '',
                       name: '',
                       description: '',
                       tags:'',
                       picture:''
                    }
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    })
</script>