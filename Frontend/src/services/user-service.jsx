import authHeader from "./auth-header";
import axios from "axios";

const API_URL = "http://localhost:8080/api/test/"

class userService{
    getPublicContent(){
        return axios.get(API_URL + 'all')
    }

    getUserBoard(){
        return axios.get(API_URL + 'user' , { headers: authHeader() })
    }

    getRhBoard(){
        return axios.get(API_URL + 'mod' , { headers:authHeader() })
    }

    getAdminBoard(){
        return axios.get(API_URL + 'admin' , { headers:authHeader() })
    }
}

export default new userService()