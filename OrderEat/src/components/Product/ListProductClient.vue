<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Temps de préparation estimé</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in Products" :key="product._id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }} €</td>
                        <td>{{ product.estimation_time }} min</td>
                        <td>
                            <button @click.prevent="deleteProduct(product._id)" class="btn btn-primary">Ajouter au panier</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import ApiService from "../../services/apiService"
    import { mapState  } from 'vuex'
    export default {
        data() {
            return {
                Products: []
            }
        },
        async beforeCreate() {
            // if(this.userInfo.role_id)
            const service = new ApiService()
            //let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/';
            //let apiURL:string = 'get-all-product';
            let apiURL:string = 'get-all-order';
            
            let authToken:string = localStorage.getItem('AUTH_TOKEN') 
            let data:any = await service.getCall(apiURL, authToken);
            this.Products = data.products
        },
        methods: {
            // addProduct(id:any){

            // }
        },
        computed: mapState([
            // map this.count to store.state.count
            'isLoggedIn',
            'userInfo'
            ]),
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>