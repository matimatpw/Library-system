import { jwtDecode } from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";

// const apiEndpoint = apiUrl + "/auth";
const apiEndpoint = "http://localhost:8080" + "/api/v1/auth/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt["token"]);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt); //{role: 'USER', id: 1, sub: 'abc@abc', iat: 1704674359, exp: 1704760759}
  } catch (ex) {
    return null;
  }
}

export function getIsAdmin() {
  const decoded = getCurrentUser();
  return decoded.role === "ADMIN";
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  getIsAdmin,
};
