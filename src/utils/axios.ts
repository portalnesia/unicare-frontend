import axios from 'axios'
import { webUrl } from './main';

const API = axios.create({
    baseURL: webUrl("/helios/api"),
    timeout: 0,
})

export default API;