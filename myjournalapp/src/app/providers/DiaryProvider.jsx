import React, { createContext, useState, useContext } from 'react';

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [image, setImage] = useState(null);

  const addEntry = (entry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  const editEntry = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const deleteEntry = (entryId) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== entryId));
  };

  const uploadImage = (file) => {
    setImage(file);
  };

  console.log("DiaryProvider data:", { entries, image }); // Добавить лог для отладки

  return (
    <DiaryContext.Provider
      value={{
        entries,
        addEntry,
        editEntry,
        deleteEntry,
        image,
        uploadImage,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  return useContext(DiaryContext);
};
