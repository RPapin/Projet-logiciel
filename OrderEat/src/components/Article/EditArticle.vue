<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Article</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Type</label>
                    <select v-model="article.type">
                        <option disabled value="">Choose</option>
                        <option>Food</option>
                        <option>Sauce</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="article.name" required>
                </div>

                <div class="form-group">
                    <label>Price ($)</label>
                    <input type="number" min="0" max="10000" step="0.01" class="form-control" v-model="article.price" required>
                </div>

                <div class="form-group">
                    <label>Estimated preparation time (min)</label>
                    <input type="number" min="0" max="60" step="1" class="form-control" v-model="menu.estimation_time" required>
                </div>

                <div class="form-group">
                    <label>Picture</label>      
                     <!-- <input type="file" class="form-control" accept="image/*" @change="handleImages($event)"> -->
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
                article: {
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
                let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/create-article';
                
                axios.post(apiURL, this.article).then(() => {
                  this.$router.push('/viewArticle')
                  this.article = {
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
                this.article.image = event.target.files[0]
                console.log(this.article)
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