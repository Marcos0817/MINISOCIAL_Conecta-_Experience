import axios from "axios";

const api = axios.create({
    baseURL: "http://172.16.36.24:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;