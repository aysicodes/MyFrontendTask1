import React, { useState } from 'react';
import ListDiaryEntries from '../features/diary/components/ListDiaryEntries';
import ConfirmModal from '../features/diary/components/ConfirmModal'; // Import the modal component

const DiaryPage = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  // Create new post
  const handleCreate = (e) => {
    e.preventDefault();

    if (!newTitle || !newContent) {
      setError('Title and content are required!');
      return;
    }

    const newEntry = { 
      id: Date.now(),
      title: newTitle, 
      content: newContent,
      imageUrl: image ? URL.createObjectURL(image) : '',
    };
    setEntries([...entries, newEntry]);
    setNewTitle('');
    setNewContent('');
    setImage(null);
    setError('');
  };

  // Edit entry
  const handleEdit = (entry) => {
    setCurrentEntry(entry);
    setNewTitle(entry.title);
    setNewContent(entry.content);
    setImage(entry.imageUrl ? null : ''); 
  };

  // Save entry changes
  const handleSave = (e) => {
    e.preventDefault();

    if (!newTitle || !newContent) {
      setError('Title and content are required!');
      return;
    }

    setEntries(entries.map((entry) =>
      entry.id === currentEntry.id ? { ...entry, title: newTitle, content: newContent, imageUrl: image ? URL.createObjectURL(image) : currentEntry.imageUrl } : entry
    ));
    setCurrentEntry(null);
    setNewTitle('');
    setNewContent('');
    setImage(null);
    setError('');
  };

  // Open delete confirmation modal
  const handleDeleteClick = (entry) => {
    setEntryToDelete(entry); // Set the whole entry for deletion
    setIsModalOpen(true); // Open the modal
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (entryToDelete) {
      setEntries(entries.filter((entry) => entry.id !== entryToDelete.id)); // Remove the entry
    }
    setIsModalOpen(false);
    setEntryToDelete(null);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setEntryToDelete(null);
  };

  return (
    <div>
      <h1>My Diary</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
        {image && <p>Image selected: {image.name}</p>}

        <button type="submit">{currentEntry ? "Save Changes" : "Create Entry"}</button>
      </form>

      <h2>Your Diary Entries</h2>
      <ListDiaryEntries
        entries={entries}
        onEdit={handleEdit}
        onDelete={handleDeleteClick} // Pass correct handler
      />

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default DiaryPage;
