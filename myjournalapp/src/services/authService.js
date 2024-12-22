import axios from 'axios';

const API_URL = 'journal-app-production-0195.up.railway.app/';

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}register`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};