import React, { useState } from 'react';
import ListDiaryEntries from '../features/diary/components/ListDiaryEntries';

const DiaryPage = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null); // Для редактирования
  const [newTitle, setNewTitle] = useState(''); // Для нового заголовка
  const [newContent, setNewContent] = useState(''); // Для нового содержимого
  const [image, setImage] = useState(null); // Для хранения загруженного изображения
  const [error, setError] = useState(''); // Для ошибки

  // Обработчик создания нового поста
  const handleCreate = (e) => {
    e.preventDefault();

    // Проверяем, что заголовок и содержимое не пустые
    if (!newTitle || !newContent) {
      setError('Title and content are required!'); // Показываем ошибку
      return; // Останавливаем выполнение
    }

    const newEntry = { 
      id: Date.now(), // Генерация уникального ID для записи
      title: newTitle, 
      content: newContent,
      imageUrl: image ? URL.createObjectURL(image) : '', // Если изображение выбрано, создаем URL
    };
    setEntries([...entries, newEntry]); // Добавляем новый пост в список
    setNewTitle(''); // Очищаем поле ввода
    setNewContent(''); // Очищаем поле ввода
    setImage(null); // Очищаем выбранное изображение
    setError(''); // Очищаем ошибку
  };

  // Обработчик редактирования записи
  const handleEdit = (entry) => {
    setCurrentEntry(entry); // Сохраняем выбранную запись для редактирования
    setNewTitle(entry.title); // Заполняем поля формы для редактирования
    setNewContent(entry.content);
    setImage(entry.imageUrl ? null : ''); // Если есть изображение, не загружаем новое
  };

  // Обработчик сохранения изменений
  const handleSave = (e) => {
    e.preventDefault();
    
    // Проверка перед сохранением изменений
    if (!newTitle || !newContent) {
      setError('Title and content are required!');
      return;
    }

    setEntries(entries.map((entry) =>
      entry.id === currentEntry.id ? { ...entry, title: newTitle, content: newContent, imageUrl: image ? URL.createObjectURL(image) : currentEntry.imageUrl } : entry
    ));
    setCurrentEntry(null); // Закрыть форму редактирования
    setNewTitle('');
    setNewContent('');
    setImage(null);
    setError('');
  };

  return (
    <div>
      <h1>My Diary</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Показываем ошибку, если она есть */}

      <form onSubmit={currentEntry ? handleSave : handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image && <p>Image selected: {image.name}</p>} {/* Отображаем имя выбранного файла */}
        
        <button type="submit">{currentEntry ? "Save Changes" : "Create Entry"}</button>
      </form>
      
      <h2>Your Diary Entries</h2>
      <ListDiaryEntries
        entries={entries}
        onEdit={handleEdit}
        onDelete={(id) => setEntries(entries.filter((entry) => entry.id !== id))}
      />
    </div>
  );
};

export default DiaryPage;
