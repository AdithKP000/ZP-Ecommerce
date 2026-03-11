import axios from "axios";


export const axiosInstance = (baseURL: string) => {
    return axios.create({
        baseURL: baseURL,
        withCredentials: true,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json"
        }
    })
}


export default axiosInstance