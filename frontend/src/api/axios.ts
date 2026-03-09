// src/api/axios.ts

//базовый экземпляр axios для запросов на бек
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,

});


export default axiosInstance;