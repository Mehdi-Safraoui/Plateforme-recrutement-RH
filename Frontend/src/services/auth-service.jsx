import axios from "axios";
import react from "react";

const API_URL = "http://localhost:8000/api/auth/"

class authService{

    login(email,password) {
        return axios 
         .post(API_URL + "login",{
            email,
            password
         })
         .then(response => {
            if (response.data.accessToken){
                localStorage.setItem("user",JSON.stringify(response.data))
            }
            return response.data
         })
    }

    logout(){
        localStorage.removeItem("user")
    }

    register(email,password,name,surname,number,city){
        return axios.post(API_URL + "signup", {
            email,
            password,
            name,
            surname,
            number,
            city
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
}

export default new authService()