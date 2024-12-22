import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { uploadImage } from '../../api/diaryApi'; 

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [image, setImage] = useState(null);
  
  const API_URL = 'http://localhost:3000/api/posts';

  // Загрузка записей при старте
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(API_URL);
        setEntries(response.data);
      } catch (error) {
        console.error('Failed to fetch diary entries', error);
      }
    };

    fetchEntries();
  }, []);

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  const deleteEntry = (id) => {
    setEntries((prevEntries) => prevEntries.filter(entry => entry.id !== id));
  };

  const editEntry = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry, deleteEntry, editEntry, image, uploadImage }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => useContext(DiaryContext);
