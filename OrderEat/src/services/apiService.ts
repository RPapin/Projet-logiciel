import axios from "axios";
export default class apiService {
    baseUrl: string = "http://localhost:4000/api/"
    constructor() {
    
    
    }
    getCall(url:string, token:string):any {
        const apiURL = this.baseUrl + url 
        const data = axios.get(apiURL, {
            headers : {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            if(res.data.refreshToken !== undefined)localStorage.setItem('AUTH_TOKEN', res.data.refreshToken)
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
            console.log(res)
            return res.data
        }).catch(error => {
            console.log(error)
        });
        return data
    }
}