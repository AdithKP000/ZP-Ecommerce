import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/products",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})


export default axiosInstance