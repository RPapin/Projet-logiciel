<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6 border border-primary" v-for="menu in CurrentRestaurantMenus" :key="menu._id">
                <div class="row">
                    <div class="col-md-3">
                        <img :src="menu.picture" :alt="'Miniature de '+menu.name" class="img-thumbnail">
                    </div>
                    <div class="col-md-6">
                        <h3>{{ menu.name }}</h3>
                        <p>{{ menu.description }} - {{ menu.estimation_time }} min</p>
                    </div>
                    <div class="col-md-2">
                        <p>{{ menu.price }} €</p>
                    </div>
                    <div class="col-md-4">
                        <NumberInputSpinner
                                :min="0"
                                :integerOnly="true"
                                v-model="menu['quantity']"
                            />
                    </div>
                    <div class="col-md-2 offset-md-10"><button class="btn btn-danger btn-block" v-on:click="updateCart(Menus)">Ajouter au panier</button></div>
                </div>
            </div>
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
                CurrentRestaurantMenus:[]
            }
        },
        async created() {
            const service = new ApiService()
            let apiURL:string = 'menus';
            
            let authToken:string = localStorage.getItem('AUTH_TOKEN') 
            let data:any = await service.getCall(apiURL, authToken);
            
            data.menus.forEach(menu => {
                
                let cartProduct = this.clientCart.find(x => x._id === menu._id)
                if(cartProduct !== undefined)menu['quantity'] = cartProduct['quantity']
                else menu['quantity'] = 0 

                if(menu.restaurant_id == this.restaurantId)
                {
                    this.CurrentRestaurantMenus.push(menu)
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

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>