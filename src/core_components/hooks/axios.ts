import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com/products",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})


export default axiosInstance