<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Editer un Article</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Type</label>
                    <select v-model="product.type">
                        <option disabled value="">Choisissez</option>
                        <option>Nourriture</option>
                        <option>Sauce</option>
                        <option>Boisson</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-control" v-model="product.name" required>
                </div>

                <div class="form-group">
                    <label>Prix ($)</label>
                    <input type="number" min="0" max="10000" step="0.01" class="form-control" v-model="product.price" required>
                </div>

                <div class="form-group">
                    <label>Temps de préparation estimé (min)</label>
                    <input type="number" min="0" max="60" step="1" class="form-control" v-model="menu.estimation_time" required>
                </div>

                <div class="form-group">
                    <label>Image</label>      
                     <!-- <input type="file" class="form-control" accept="image/*" @change="handleImages($event)"> -->
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Editer</button>
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
                product: {
                   type: '',
                   name: '',
                   price: '',
                   estimation_time: '',
                   picture:''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/create-product';
                
                axios.post(apiURL, this.product).then(() => {
                  this.$router.push('/viewProduct')
                  this.product = {
                    name: '',
                    price: '',
                    image: '',
                    description: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            },
            handleImages(event:any){
                this.product.image = event.target.files[0]
                console.log(this.product)
            }
        },
        components: {
        },
        created: function () {
            // `this` points to the vm instance
            console.log(this.$route.query)
        }

    })
</script>