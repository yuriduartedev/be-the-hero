import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333' // Desktop
  // baseURL: 'http://192.168.100.43:3333' // Mobile
})

export default api;