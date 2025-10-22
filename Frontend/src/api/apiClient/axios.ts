import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://watchily.onrender.com',
    withCredentials:true
})

export default apiClient