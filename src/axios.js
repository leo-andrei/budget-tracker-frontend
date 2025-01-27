// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8741',  // Your Symfony backend URL
  timeout: 10000,  // Optional, timeout in milliseconds
});

export default axiosInstance;