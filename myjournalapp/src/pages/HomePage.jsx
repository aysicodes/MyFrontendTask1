import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../app/providers/AuthProvider";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);

  // Обработчик создания или обновления записи
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError("You need to log in or register first!");
      return;
    }

    if (!newTitle || !newContent) {
      setError("Title and content are required!");
      return;
    }

    if (editingEntryId) {
      // Обновляем существующую запись
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === editingEntryId
            ? { ...entry, title: newTitle, content: newContent, imageUrl: image ? URL.createObjectURL(image) : entry.imageUrl }
            : entry
        )
      );
      setEditingEntryId(null);
    } else {
      // Создаём новую запись
      const newEntry = {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        imageUrl: image ? URL.createObjectURL(image) : "",
      };
      setEntries([...entries, newEntry]);
    }

    // Очищаем форму
    setNewTitle("");
    setNewContent("");
    setImage(null);
    setError("");
  };

  // Обработчик удаления записи
  const handleDelete = (id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  // Обработчик редактирования записи
  const handleEdit = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setNewTitle(entryToEdit.title);
      setNewContent(entryToEdit.content);
      setImage(null); // Чтобы не сбивать существующее изображение
      setEditingEntryId(id);
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to My Journal</h1>

      {/* Кнопки для регистрации и логина */}
      <div>
        <button onClick={() => navigate("/auth?type=register")}>Register</button>
        <button onClick={() => navigate("/auth?type=login")}>Login</button>
      </div>

      {/* Форма для создания записи */}
      <h2>{editingEntryId ? "Edit Entry" : "Form for Adding New Entry"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="form-section">
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
        <button type="submit">{editingEntryId ? "Update Entry" : "Create Entry"}</button>
      </form>

      {/* Список записей */}
      <h2>Your Diary Entries</h2>
      <div className="entries-list">
        {entries.length === 0 ? (
          <p>No entries yet. Start writing!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="diary-entry">
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              {entry.imageUrl && <img src={entry.imageUrl} alt="Entry" className="entry-image" />}
              <div className="entry-actions">
                <button onClick={() => handleEdit(entry.id)}>Edit</button>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
