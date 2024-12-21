import axios from 'axios';

const API_URL = 'journal-app-production-0195.up.railway.app/api/posts';

export const saveDiaryEntry = async (entry) => {
  try {
    const response = await axios.post(API_URL, entry);
    return response.data;
  } catch (error) {
    throw new Error('Failed to save entry.');
  }
};
