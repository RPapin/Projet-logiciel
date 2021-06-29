<template>
    <div class="row">
        <div class="col-md-12">
            <h1>Mon Panier</h1>
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
                    <tr v-for="(product) in products" :key="product._id">
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
            <div v-if="products.length !== 0" class="col-md-2 offset-md-10"><button class="btn btn-danger btn-block float-right" v-on:click="valideCart()">Valider la commande</button></div>
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
                products: [],
            }
        },
        created() {
            this.products = this.clientCart
        },

        methods: {
            ...mapMutations([
                'updateCart'
            ]),
            async valideCart(){
                console.log(this.products)
                const body = {
                    account_id : this.userInfo.account_id,
                    products: this.products
                }
                const apiService = new ApiService()
                let apiURL = 'create-order';
                await apiService.postCall(apiURL, JSON.parse(JSON.stringify(body)))
            }
        },
        computed: mapState([
            // map this.count to store.state.count
            'userInfo',
            'clientCart'
            ]),
        components: {
            NumberInputSpinner,
        },
    }
</script>
