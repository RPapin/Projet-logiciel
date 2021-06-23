<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Order</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="order.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="order.email" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="order.phone" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Create</button>
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
                order: {
                   name: '',
                   email: '',
                   phone: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/create-order';
                
                axios.post(apiURL, this.order).then(() => {
                  this.$router.push('/view')
                  this.order = {
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