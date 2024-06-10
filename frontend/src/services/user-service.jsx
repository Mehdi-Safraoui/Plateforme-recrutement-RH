// user-service.js

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/signup";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getRhBoard() {
    return axios.get(API_URL + "rhboard", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
