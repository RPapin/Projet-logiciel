<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="article in Articles" :key="article._id">
                        <td>{{ article.name }}</td>
                        <td>{{ article.email }}</td>
                        <td>{{ article.phone }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: article._id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteArticle(article._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from "axios";

    export default {
        data() {
            return {
                Articles: []
            }
        },
        created() {
            //let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/';
            let apiURL = 'http://localhost:4000/api/get-all-article';
            let authToken = localStorage.getItem('AUTH_TOKEN')
            console.log(authToken)
            axios.get(apiURL, {
                headers : {
                    Authorization: "Bearer " + authToken
                }
            }).then(res => {
                this.Articles = res.data;
                console.log(res.data)
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteArticle(id){
                let apiURL = `http://${process.env.LOAD_BALANCER_HOST}:${process.env.LOAD_BALANCER_PORT}/api/delete-article/${id}`;
                let indexOfArrayItem = this.Articles.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Articles.splice(indexOfArrayItem, 1);
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