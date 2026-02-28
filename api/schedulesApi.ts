import axios from 'axios'

export const schedulesApi = axios.create({
    baseURL: 'http://10.0.2.2:8081/api/schedule/employeeday',
    timeout: 5000,
})