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
        async created() {
            const service = new ApiService()
            let authToken:string = localStorage.getItem('AUTH_TOKEN') 

            let data:any = await service.getCall('get-all-product', authToken);
            let dbProducts = data.products
            data = await service.getCall('menus', authToken);
            let dbMenus = data.menus
            this.clientCart.forEach(cartProduct => {
                if(cartProduct.item_type == "product")
                {
                    let productTemp = dbProducts.find(product => product._id === cartProduct.item_id)
                    productTemp['item_type'] = "article"
                    this.products.push(productTemp)
                }
                else if(cartProduct.item_type == "menu")
                {
                    let menuTemp = dbMenus.find(menu => menu._id === cartProduct.item_id)
                    menuTemp['item_type'] = "menu"
                    this.products.push(menuTemp)
                }

                if(this.products.length > 0)this.products[this.products.length-1].quantity = cartProduct.quantity
            })
            console.log(this.products)
        },

        methods: {
            ...mapMutations([
                'updateCart',
                'removeCart'
            ]),
            async valideCart(){
                console.log(this.products)
                let authToken = localStorage.getItem('AUTH_TOKEN')
                const body = {
                    account_id : this.userInfo.account_id,
                    products: this.products
                }
                const apiService = new ApiService()
                let apiURL = 'create-order';
                await apiService.postCall(apiURL, JSON.parse(JSON.stringify(body)), authToken)
                this.removeCart()
                this.$router.push('/follow-orders')
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
