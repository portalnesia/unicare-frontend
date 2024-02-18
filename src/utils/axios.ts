import axios from 'axios'
import { webUrl } from './main';

const API = axios.create({
    baseURL: webUrl("/unicare/api"),
    timeout: 0,
})

export default API;