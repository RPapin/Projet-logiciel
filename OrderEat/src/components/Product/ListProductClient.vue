<template>
    <div class="row">
        <div class="col-md-12">
            <h1>Liste des produits</h1>
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Temps de préparation estimé</th>
                        <th>Quantité</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product) in CurrentRestaurantProducts" :key="product._id">
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }} €</td>
                        <td>{{ product.estimation_time }} min</td>
                        <td>
                             <NumberInputSpinner
                                :min="0"
                                :integerOnly="true"
                                v-model="product['quantity']"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-md-2 offset-md-10"><button class="btn btn-danger btn-block" v-on:click="updateCart({newCart:CurrentRestaurantProducts, isProduct:true})">Ajouter au panier</button></div>
        </div>
    </div>
</template>

<script lang="ts">
    import ApiService from "../../services/apiService"
    import { mapState, mapMutations  } from 'vuex'
    import NumberInputSpinner from 'vue-number-input-spinner'
    export default {
        data() {
            return {
                CurrentRestaurantProducts:[]
            }
        },
        async created() {
            // if(this.userInfo.role_id)
            const service = new ApiService()
            //let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/';
            //let apiURL:string = 'get-all-product';
            let apiURL:string = 'get-all-product';
            
            let authToken:string = localStorage.getItem('AUTH_TOKEN') 
            let data:any = await service.getCall(apiURL, authToken);

            data.products.forEach(product => {
                
                let cartProduct = this.clientCart.find(x => x._id === product._id)
                if(cartProduct !== undefined)product['quantity'] = cartProduct['quantity']
                else product['quantity'] = 0 
                if(product.restaurant_id == this.restaurantId)
                {
                    this.CurrentRestaurantProducts.push(product)
                }
            });
        },
        props: [
            'restaurantId'
        ],
        methods: {
        ...mapMutations([
            'updateCart'
        ]),
        },
        computed: mapState([
            // map this.count to store.state.count
            'clientCart'
            ]),
        components: {
            NumberInputSpinner,
        },
    }
</script>
