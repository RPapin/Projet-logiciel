<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Editer un menu</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-control" v-model="menu.name" required>
                </div>

                <div class="form-group">
                    <label>Prix ($)</label>
                    <input type="number" min="0" max="10000" step="0.01" class="form-control" v-model="menu.price" required>
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
                    <label>Composition</label>
                    <div v-bind:id="'composition_item_' + product.id" class="composition_item" v-for="product in products" :key="product.id">
                        <input type="checkbox" :id="'checkbox_' + product.id" :value="product.id" v-model="checkedProducts">
                        <label :for="'checkbox_' + product.id">{{ product.name }}</label>
                        <input type="number" :id="'quantity_product_' + product.id" min="1" max="100" step="1" class="form-control" required>
                    </div>
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

    // [TODO] Load products for composition

    export default Vue.extend({
        data() {
            return {
                products: [],
                checkedProducts: [],
                menu: {
                   name: '',
                   price: '',
                   estimation_time: '',
                   picture:'',
                   products:''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/create-menu';
                
                axios.post(apiURL, this.menu).then(() => {
                  this.$router.push('/view')
                  this.menu = {
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