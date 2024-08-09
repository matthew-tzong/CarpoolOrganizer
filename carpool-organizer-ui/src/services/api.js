import axios from 'axios';

// Base URL for the API
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
export const validateCompany = (data) => handleApiRequest('post', '/companies/validate', data);
export const createCompany = (data) => handleApiRequest('post', '/companies', data);
export const validateUser = (data) => handleApiRequest('post', '/users/validate', data);
export const createUser = (data) => handleApiRequest('post', '/users', data);


export default api;