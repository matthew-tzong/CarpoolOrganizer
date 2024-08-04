import axios from 'axios';

// Base URL for the API, can be overridden by environment variables
const API_URL = 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle API requests
const handleApiRequest = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url,
      data,
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    // Log error details
    console.error('API request error:', error);
    throw error;
  }
};

// Export methods for API interaction
export const get = (url) => handleApiRequest('get', url);
export const post = (url, data) => handleApiRequest('post', url, data);
export const put = (url, data) => handleApiRequest('put', url, data);
export const del = (url) => handleApiRequest('delete', url);
