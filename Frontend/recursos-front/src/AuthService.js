// src/AuthService.js

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/recursos/";

class AuthService {
  register(username, email, password) {
    return axios.post(API_URL + "register/", {
      username,
      email,
      password,
    });
  }

  login(username, password) {
    return axios
      .post(API_URL + "login/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

// Create an instance of AuthService
const authServiceInstance = new AuthService();

// Export the instance as the default export
export default authServiceInstance;
