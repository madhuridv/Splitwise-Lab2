import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4000/"
});

export default function setAuthorizationToken(token) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}
