import axios from 'axios';

// Create an axios instance with a base URL for your local API.
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Use an interceptor to add the auth token to every request if it exists.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Ensure the header format matches what your backend expects (e.g., 'Bearer TOKEN')
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
