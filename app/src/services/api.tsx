import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.2.12:8000/",
  withCredentials: true,
  timeout: 1000 * 5,
});

export default api;
