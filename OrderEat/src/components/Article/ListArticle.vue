<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Temps de préparation estimé</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="article in Articles" :key="article._id">
                        <td>{{ article.name }}</td>
                        <td>{{ article.price }} €</td>
                        <td>{{ article.estimation_time }} min</td>
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
    import ApiService from "../../services/apiService"
    export default {
        data() {
            return {
                Articles: []
            }
        },
        created() {
            const service = new ApiService()
            //let apiURL = 'http://'+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT+'/api/';
            let apiURL:string = 'get-all-article';
            let authToken:string = localStorage.getItem('AUTH_TOKEN') === null ? "" : localStorage.getItem('AUTH_TOKEN')
            
            let data:any = service.getCall(apiURL, authToken);
            this.Articles = data.articles
        },
        methods: {
            deleteArticle(id:any){
                let apiURL = `http://${process.env.LOAD_BALANCER_HOST}:${process.env.LOAD_BALANCER_PORT}/api/delete-article/${id}`;
                let indexOfArrayItem = this.Articles.findIndex((i:any) => i._id === id);

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