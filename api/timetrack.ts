import axios from 'axios'

export const timeTrackApi = axios.create({
    baseURL: 'http://10.0.2.2:8081',
    timeout: 5000,
})