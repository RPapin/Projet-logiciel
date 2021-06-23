<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Article</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="article.name" required>
                </div>

                <div class="form-group">
                    <label>Price</label>
                    <input type="email" class="form-control" v-model="article.email" required>
                </div>

                <div class="form-group">
                    <label>Image</label>      
                     <!-- <input type="file" class="form-control" accept="image/*" @change="handleImages($event)"> -->
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" v-model="article.description" required>
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
                   name: '',
                   price: '',
                   image:'',
                   description: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:4000/api/create-article';
                
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
            handleImages(event){
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