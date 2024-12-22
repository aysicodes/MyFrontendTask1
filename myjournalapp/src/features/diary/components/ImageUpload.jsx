import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        setImage(null);
        return;
      }

      if (file.size > 5000000) {  // Limit file size to 5MB
        setError('File size is too large. Please upload a file smaller than 5MB.');
        setImage(null);
        return;
      }

      try {
        const formData = new FormData();
        formData.append('image', file);
        
        // Убедитесь, что путь правильный, указав правильный путь для API
        const response = await axios.post('http://localhost:8080/image/upload', formData, {  // Путь изменен на правильный
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        // Получаем URL изображения из ответа
        setImageUrl(response.data);  // Предполагается, что сервер возвращает URL изображения
        onImageUpload(response.data);  // Передаем URL в родительский компонент
        setImage(file);  // Сохраняем файл изображения для отображения
        setError('');
      } catch (error) {
        setError('Image upload failed.');
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl('');
    setError('');
    onImageUpload(null);  // Очищаем загруженное изображение в родительском компоненте
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 p-2 border rounded"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {image && (
        <div className="mt-4">
          <img src={URL.createObjectURL(image)} alt="Selected" className="w-32 h-32 object-cover rounded" />
          <button onClick={handleRemoveImage} className="mt-2 text-red-500 text-sm">
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
