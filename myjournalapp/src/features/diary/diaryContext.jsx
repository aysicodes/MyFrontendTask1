// src/app/providers/DiaryProvider.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [image, setImage] = useState(null);

  const API_URL = 'http://localhost:3000/api/posts';

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  const deleteEntry = (id) => {
    setEntries((prevEntries) => prevEntries.filter(entry => entry.id !== id));
  };

  const editEntry = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map(entry =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const uploadImage = (imageFile) => {
    setImage(imageFile);  // Пример, как сохранить изображение в состоянии
    // Здесь можно добавить логику для отправки изображения на сервер
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry, deleteEntry, editEntry, image, uploadImage }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => useContext(DiaryContext);
