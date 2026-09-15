import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.137.1:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;