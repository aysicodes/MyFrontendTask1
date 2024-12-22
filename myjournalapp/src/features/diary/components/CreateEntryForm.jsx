import React, { useState } from 'react';
import Button from '../../../shared/ui/Button';  // Импортируем Button из общей UI компоненты
import Input from '../../../shared/ui/Input';    // Импортируем Input из общей UI компоненты
import { saveDiaryEntry } from '../../api/diaryApi';  // Импортируем функцию saveDiaryEntry

const CreateEntryForm = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    if (title.trim() === '' || content.trim() === '') {
      setError('Both title and content are required.');
      return;
    }
    if (title.length > 100) {
      setError('Title is too long.');
      return;
    }
    if (content.length > 10000) {
      setError('Content exceeds the character limit.');
      return;
    }

    // Устанавливаем флаг загрузки
    setIsSubmitting(true);

    try {
      // Сохраняем запись через API
      const savedEntry = await saveDiaryEntry({ title, content });

      // Если onSave передан как пропс, вызываем его с сохраненной записью
      if (onSave) {
        onSave(savedEntry);
      }

      // Сбрасываем форму
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      // Обрабатываем ошибку
      setError('There was an error saving your entry.');
    } finally {
      // Сбрасываем флаг загрузки
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="p-2 border border-gray-300 rounded w-full h-40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your diary entry..."
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </Button>
    </form>
  );
};

export default CreateEntryForm;
