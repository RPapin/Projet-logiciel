import axios from "axios";
import Vue from 'vue';
import router from '../router';

export default class apiService extends Vue{
    baseUrl: string = "http://localhost:4000/api/"
    constructor() {
        super();
    }
    getCall(url:string, token:string = "", checkAuth:boolean=false):any {
        const apiURL = this.baseUrl + url
        let headers = {}
        if(token !== "")headers = {
            headers : {
                Authorization: "Bearer " + token
            }
        }
        const data = axios.get(apiURL, headers).then(res => {
            // Token is invalid
            if(res.data.error!== undefined && !checkAuth){
                localStorage.setItem('AUTH_TOKEN', undefined)
                router.push('/login')
            }
            if(res.data.refreshToken !== undefined){
                console.log('set new auth token with refresh token')
                localStorage.setItem('AUTH_TOKEN', res.data.refreshToken)
            }
            return res.data
        }).catch(error => {
            console.log(error)
        });
        return data
    }
    postCall(url:string, postData:any, token:string = ""):any {
        const apiURL = this.baseUrl + url
        let headers = {}
        if(token !== "")headers = {
            headers : {
                Authorization: "Bearer " + token
            }
        }
        const data = axios.post(apiURL, postData, headers).then(res => {
            // Token is invalid
            if(res.data.error!== undefined){
                localStorage.setItem('AUTH_TOKEN', undefined)
                router.push('/login')
            }
            if(res.data.refreshToken !== undefined)localStorage.setItem('AUTH_TOKEN', res.data.refreshToken)
            return res.data
        }).catch(error => {
            console.log(error)
        });
        return data
    }
}