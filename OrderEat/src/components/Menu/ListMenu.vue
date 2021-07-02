<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6 border border-primary" v-for="menu in Menus" :key="menu._id">
                <div class="row">
                    <div class="col-md-3">
                        <img src="default./png" :alt="'Miniature de '+menu.name" class="img-thumbnail">
                    </div>
                    <div class="col-md-6">
                        <h3>{{ menu.name }}</h3>
                        <p>{{ menu.description }} - {{ menu.estimation_time }} min</p>
                    </div>
                    <div class="col-md-3">
                        <p>{{ menu.price }} €</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from "axios";

    export default {
        data() {
            return {
                Orders: []
            }
        },
        created() {
            let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api';
            axios.get(apiURL).then(res => {
                this.Orders = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteOrder(id){
                let apiURL = `http://${process.env.LOAD_BALANCER_HOST}:${process.env.LOAD_BALANCER_PORT}/api/delete-order/${id}`;
                let indexOfArrayItem = this.Orders.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Orders.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>