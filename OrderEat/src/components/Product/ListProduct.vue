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
                            <router-link :to="{name: 'edit', params: { id: product._id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteProduct(product._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from "axios";
    import ApiService from "../../services/apiService"
    import { mapState, mapActions  } from 'vuex'
    export default {
        data() {
            return {
                Products: []
            }
        },
        async created() {
            if(this.userInfo.role_name === 'client')this.$router.push('/viewProductsClient')
            const service = new ApiService()
            //let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/';
            let apiURL:string = 'get-all-product';
            let authToken:string = localStorage.getItem('AUTH_TOKEN') === null ? "" : localStorage.getItem('AUTH_TOKEN')
            let data:any = await service.getCall(apiURL, authToken);
            this.Products = data.products
        },
        methods: {
            deleteProduct(id:any){
                let apiURL = `http://${process.env.LOAD_BALANCER_HOST}:${process.env.LOAD_BALANCER_PORT}/api/delete-product/${id}`;
                let indexOfArrayItem = this.Products.findIndex((i:any) => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Products.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            ...mapActions([
                'checkUser',
            ])
        },
        computed: mapState([
                'userInfo'
            ]),
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>