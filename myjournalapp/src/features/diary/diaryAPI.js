import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts';

export const saveDiaryEntry = async (entry) => {
  try {
    const response = await axios.post(API_URL, entry);
    return response.data;
  } catch (error) {
    throw new Error('Failed to save entry.');
  }
};
