import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiUrl = "http://localhost:8080";

const apiEndpoint = apiUrl + "/api/v1/auth/register";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
