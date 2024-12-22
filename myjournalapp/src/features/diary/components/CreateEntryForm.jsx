// src/features/diary/components/CreateEntryForm.jsx
import React, { useState } from 'react';
import Button from '../../../shared/ui/Button';  // Import Button from shared UI components
import Input from '../../../shared/ui/Input';    // Import Input from shared UI components
import { saveDiaryEntry } from '../../api/diaryApi';  // Import saveDiaryEntry function
import RichTextEditor from './RichTextEditor';  // Import RichTextEditor component

const CreateEntryForm = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
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

    // Set submitting state
    setIsSubmitting(true);

    try {
      // Save the entry via API
      const savedEntry = await saveDiaryEntry({ title, content });

      // If onSave is passed, invoke it with the saved entry
      if (onSave) {
        onSave(savedEntry);
      }

      // Reset form
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      // Handle error
      setError('There was an error saving your entry.');
    } finally {
      // Reset submitting state
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
      <RichTextEditor value={content} onChange={setContent} />  {/* Use RichTextEditor */}
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </Button>
    </form>
  );
};

export default CreateEntryForm;
