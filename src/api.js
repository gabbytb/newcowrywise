// TITLE: SETUP AXIOS
// Create a new file to set up Axios. 
// This file will be like your helper’s official guide on how to behave. 
// Name this file api.js or axiosConfig.js.

// api.js
import axios from 'axios';

// Create an instance of Axios with default settings
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // This is your server’s base URL
  timeout: 3000, // Optional: Maximum time to wait for a response
});

export default api;