import React, { useEffect } from 'react';
import { useDiary } from "../app/providers/DiaryProvider.jsx";
import CreateEntryForm from '../features/diary/components/CreateEntryForm';
import ListDiaryEntries from '../features/diary/components/ListDiaryEntries';
import ImageUpload from '../features/diary/components/ImageUpload';

const DiaryPage = () => {
  // Получаем значения из контекста
  const { entries, addEntry, deleteEntry, editEntry, image, uploadImage } = useDiary() || {};

  useEffect(() => {
    // Optionally, fetch initial diary entries from an API or local storage
  }, []);

  // Защищаем компонент от ошибок, если контекст не загрузился
  if (!entries) {
    return <div>Loading...</div>; // Выводим текст загрузки, если entries еще не получены
  }

  return (
    <div>
      <h1>My Diary</h1>
      <CreateEntryForm onSave={addEntry} />
      <ListDiaryEntries
        entries={entries}
        onDelete={deleteEntry}
        onEdit={editEntry}
      />
      <ImageUpload onImageUpload={uploadImage} />
    </div>
  );
};

export default DiaryPage;
